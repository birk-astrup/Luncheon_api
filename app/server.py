from ariadne import ObjectType, graphql_sync, make_executable_schema, load_schema_from_path, ScalarType
from ariadne.constants import PLAYGROUND_HTML
from .auth import requires_auth, requires_scope
from bson.objectid import ObjectId
from .errors import AuthError
import datetime
from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
import app.extensions as ex
from functools import wraps
from jose import jwt
import json
from pprint import pprint
import os
from pymongo import MongoClient
from urllib.request import urlopen


def create_app():

    app = Flask(__name__)

    mongo = MongoClient(os.environ["MONGO_URI"])

    type_defs = load_schema_from_path('app/graphql/schema.graphql')
    query = ObjectType("Query")
    mutation = ObjectType("Mutation")
    user = ObjectType("User")
    registered = ObjectType("Registered")
    dateScalar = ScalarType("Datetime")

    bindables = [query, mutation, user, registered, dateScalar]

    @dateScalar.serializer
    def serialize_dateScalar(value):
        """Serialize custom DateScalar scalar for graphql-schema."""
        return value.isoformat()

    @query.field("user")
    def resolve_user(_, info, _id):
        #TODO: maybe this can be a decorator?
        status = False
        error = {"message": "could not get users"}
        payload = {"status": status, "error": error}
        
        with mongo:
            try:
                user = map(ex.prepare, mongo.db.users.find({"_id": ObjectId(_id)}))
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
                users = []
                if mongo.db.users.count_documents({}) >= 1:
                    for user in mongo.db.users.find({}):
                        ex.prepare(user)
                        users.append(user)
                    payload["error"] = None
                    payload["status"] = True
                
                else:
                    payload["error"]["message"] = "No users in database"
                    payload["status"] = False

                payload["user"] = users

            except Exception as e:
                print(e)
                payload["error"]["message"] = "Could not get users"
        
        return payload
    
    #TODO: Implement lambda functions in method
    @mutation.field("registerLunch")
    def resolve_register_lunch(_, info, nickname, email, _id):
        """Adds timestamp for registration to the database"""

        new_timestamp = datetime.datetime.utcnow()
        
        if new_timestamp.isoweekday() < 6:
            
            new_timestamp = new_timestamp.strftime("%Y-%m-%d")

            registered = {"_id": ObjectId(), "timestamp": new_timestamp}

            user = {"_id": ObjectId(_id) ,"nickname": nickname, "email": email, "registered": registered}

            if ex.get_user(nickname, email, mongo):
                return ex.register_lunch(user, mongo, True)
            
            else:
                return ex.register_lunch(user, mongo)
        
        return {'status': False, 'error': {'message': 'lunch is only available on weekdays'}}

    @mutation.field("deleteUser")
    def resolve_deleteUser(_, info, _id):
        """Deletes specified entry
        Args:
            _id (str): document id of user to delete.
        """
        return ex.delete_user(_id, mongo)

    @mutation.field("deleteTimestamp")
    def resolve_deleteTimestamp(_, info, user_id, timestamp_id):
        """Deletes specified timestamp for a user
        
        Args:
            user_id (str): document id of user.
            timestamp_id (str): id of date to delete.
        """
        return ex.delete_timestamp(user_id, timestamp_id, mongo)

    @user.field("registered")
    def resolve_registered(payload, info):
        registered = []
        for timestamp in payload["registered"]:
            registered.append(timestamp)
        return registered

    schema = make_executable_schema(type_defs, bindables)

    @app.errorhandler(AuthError)
    def handle_auth_error(exception):
        """Returns response from authorization error."""
        response = jsonify(exception.error)
        response.status_code = exception.status_code

        return response

    @app.route("/graphql", methods=["GET"])
    #@cross_origin(send_wildcard=True, headers=["Content-type", "Authorization"])
    @cross_origin()
    #@requires_auth()
    #@requires_scope('developer')
    def graphql_playground():
        return PLAYGROUND_HTML, 200

    @app.route("/graphql", methods=["POST"])
    #@cross_origin(send_wildcard=True, headers=["Content-type", "Authorization"])
    @cross_origin()
    #@requires_auth()
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

