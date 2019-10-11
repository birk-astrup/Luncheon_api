from ariadne import ObjectType, graphql_sync, make_executable_schema, load_schema_from_path, ScalarType
from ariadne.constants import PLAYGROUND_HTML
from .auth import requires_auth
from bson.objectid import ObjectId
from .config import dev_config, prod_config
from .errors import AuthError, CreateUserError
import datetime
from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
import app.extensions as ex
from functools import wraps
from jose import jwt
import json
import os
from pymongo import MongoClient
from urllib.request import urlopen


def create_app(config = dev_config):

    app = Flask(__name__)

    if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] == "production":
        config = prod_config
    app.config.from_object(config)

    mongo = MongoClient(config.MONGO_URI)

    type_defs = load_schema_from_path('app/graphql/schema.graphql')
    query = ObjectType("Query")
    mutation = ObjectType("Mutation")
    dateScalar = ScalarType("Datetime")

    bindables = [query, mutation, dateScalar]

    @dateScalar.serializer
    def serialize_dateScalar(value):
        """Serialize custom DateScalar scalar for graphql-schema."""
        return value.isoformat()

    @query.field("user")
    def resolve_user(_, info, nickname, email):
        #TODO: maybe this can be a decorator?
        status = False
        error = {"message": "could not get users"}
        payload = {"status": status, "error": error}
        
        with mongo:
            try:
                user = map(ex.prepare, mongo.db.users.find({"nickname": nickname, "email": email}))
                print(user)
                payload["user"] = user
                payload["status"] = True
                payload["error"] = None

                return payload
            except Exception as e:
                print(e)
                payload["error"]["message"] = "could not get user"
                return payload

    
    @query.field("getUsers")
    def resolve_get_users(_, info):

        status = False
        error = {"message": "could not get users"}
        payload = {"status": status, "error": error}
        with mongo:
            try:
                users = map(ex.prepare, mongo.db.users.find({}))
                payload["user"] = users
                payload["error"] = None
                payload["status"] = True

            except Exception: 
                payload["error"]["message"] = "could not get users"

        return payload
    
    #TODO: Implement lambda functions in method
    @mutation.field("registerLunch")
    def resolve_register_lunch(_, info, nickname, email):
        """Adds timestamp for registration to the database"""

        new_timestamp = datetime.datetime.utcnow()

        user = {"nickname": nickname, "email": email, "timestamp_to_register": new_timestamp }

        if ex.get_user(nickname, email, mongo):
            return ex.register_lunch(user, mongo, True)
        
        else:
            return ex.register_lunch(user, mongo)

    schema = make_executable_schema(type_defs, bindables)

    @app.errorhandler(AuthError)
    def handle_auth_error(exception):
        """Returns response from authorization error."""
        response = jsonify(exception.error)
        response.status_code = exception.status_code

        return response

    @app.route("/graphql", methods=["GET"])
    #@cross_origin(headers=["Content-type", "Authorization"])
    #@requires_auth(config)
    def graphql_playground():
        return PLAYGROUND_HTML, 200
     
    @app.route("/graphql", methods=["POST"])
    #@cross_origin(headers=["Content-type", "Authorization"])
    #@requires_auth(config)
    def graphql_server():
        data = request.get_json()

        success, result = graphql_sync(
            schema,
            data,
            context_value=None,
            debug=app.debug
        )
        status_code = 200 if success else 400
        return jsonify(result), status_code

    return app
