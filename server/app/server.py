from ariadne import ObjectType, graphql_sync, make_executable_schema, load_schema_from_path, ScalarType
from ariadne.constants import PLAYGROUND_HTML
from .auth import requires_auth
from bson.objectid import ObjectId
from .config import dev_config, prod_config
from .errors import AuthError, CreateUserError
#from app.validators import check_if_exists
import datetime
from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
from .extensions import prepare
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

    bindables = [query, mutation]

    @dateScalar.serializer
    def serialize_dateScalar(value):
        """Serialize custom DateScalar scalar for graphql-schema."""
        return value.isoformat()

    @query.field("node")
    def resolve_node(_, info):
        pass
    
    @query.field("getUsers")
    def resolve_get_users(_, info):

        status = False
        error = {"message": "could not get users"}
        payload = {"status": status, "error": error}
        with mongo:
            try:
                users = map(prepare, mongo.db.users.find({}))
                payload["user"] = users
                payload["error"] = None
                payload["status"] = True

            except Exception: 
                payload["error"]["message"] = "could not get users"

        return payload

    @mutation.field("createUser")
    def resolve_add_user(_, info, nickname: str, email: str):
        """Checks if user exists, if not, inserts user to database."""

        user = {"nickname": nickname, "email": email }
        query = {'$or': [{'nickname': user['nickname']}, {'email': user['email']}]}
        error = {"message": "could not insert user"}
        status = False
        payload = {"status": status, "error": error}

        with mongo:

            existing_user = mongo.db.users.find_one(query)
            
            if existing_user is None:
             
                try:
                    mongo.db.users.insert_one(user)
                    payload["error"] = None
                    payload["status"] = True
                    payload["user"] = user
                
                except Exception:
                    error["message"] = "Could not insert user"
                    
            else:

                if (existing_user["nickname"] == nickname):
                    error["message"] = "This nickname is already in use"
                elif (existing_user["email"] == email):
                    error["message"] = "This email is already in use"

        return payload
    
    

    schema = make_executable_schema(type_defs, bindables)

    @app.errorhandler(AuthError)
    def handle_auth_error(exception):
        """Returns response from authorization error."""
        response = jsonify(exception.error)
        response.status_code = exception.status_code

        return response

    @app.route("/graphql", methods=["GET"])
    @cross_origin(headers=["Content-type", "Authorization"])
    @requires_auth(config)
    def graphql_playground():
        return PLAYGROUND_HTML, 200
     
    @app.route("/graphql", methods=["POST"])
    @cross_origin(headers=["Content-type", "Authorization"])
    @requires_auth(config)
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

