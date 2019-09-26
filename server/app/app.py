from ariadne import ObjectType, graphql_sync, make_executable_schema, load_schema_from_path, ScalarType
from ariadne.constants import PLAYGROUND_HTML
from app.config import dev_config, prod_config
from app.errors import AuthError, CreateUserError
#from app.validators import check_if_exists
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
    datetime = ScalarType("Datetime")

    bindables = [query, mutation]

    @datetime.serializer
    def serialize_datetime(value):
        """Serialize custom datetime scalar for graphql-schema."""
        return value.isoformat()

    @query.field("node")
    def resolve_node(_, info):
        pass
    
    @query.field("getUsers")
    def resolve_get_users(_, info):
        with mongo:
            try:
                users = map(prepare, mongo.db.users.find({}))
            
            except Exception: 
                return None

            return users


    @mutation.field("createUser")
    def resolve_add_user(_, info, nickname: str, email: str):
        """Checks if user exists, if not, inserts user to database."""

        user = {"nickname": nickname, "email": email }
        query = {'$or': [{'nickname': user['nickname']}, {'email': user['email']}]}

        with mongo:

            existing_user = mongo.db.users.find_one(query)
            error = {"message": "could not insert user"}
            status = False
            payload = {"status": status, "error": error}
            
            if existing_user is None:
             
                try:
                    mongo.db.users.insert_one(user)
                    status = True
                    error = None
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
    
    def get_token_auth_header():
        """Obtains the Access Token from the Authorization header."""
        auth = request.headers.get("Authorization", None)
        if not auth:
            raise AuthError({
            "code": "authorization_header_missing",
            "description": "Authorization header is expected"
            }, 401)
        
        parts = auth.split()

        if parts[0].lower() != "bearer":
            raise AuthError({
            "code": "invalid_header",
            "description": "Authorization header must start with Bearer"
            }, 401)

        elif len(parts) == 1:
            raise AuthError({
            "code": "invalid_header",
            "description": "Token not found"
            }, 401)
        
        elif len(parts) > 2:
            raise AuthError({
            "code": "invalid_header",
            "description": "Authorization token must be Bearer token"
            }, 401)
        
        token = parts[1]
        return token
    
    def requires_auth(f):
        """Determines if the Access Token is valid"""
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header()
            jsonurl = urlopen("https://"+config.DOMAIN+"/.well-known/jwks.json")
            jwks = json.loads(jsonurl.read())
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            for key in jwks["keys"]:
                if key["kid"] == unverified_header["kid"]:
                    rsa_key = {
                        "kty": key["kty"],
                        "kid": key["kid"],
                        "use": key["use"],
                        "n": key["n"],
                        "e": key["e"]
                    }
            
            if rsa_key: 
                try:
                    payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=config.ALGORITHM,
                    audience=config.AUDIENCE,
                    issuer="https://"+config.DOMAIN+"/"
                    )
                    
                except jwt.ExpiredSignatureError:
                    raise AuthError({
                        "code": "token_expired",
                        "description": "token is expired"
                        }, 401)
                
                except jwt.JWTClaimsError:
                    raise AuthError({
                        "code": "invalid_claims",
                        "description": "incorrect claims, please check the audience and issuer"
                        }, 401)
                
                except Exception:
                    raise AuthError({
                        "code": "invalid_header",
                        "description": "unable to parse authentication token"
                        }, 401)
                
                _request_ctx_stack.top.current_user = payload
                return f(*args, **kwargs)
            raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
        return decorated
    
    def requires_scope(required_scope):
        """Determines if the required scope is present in the Access Token

        Args:
            required_scope (str): The scope required to access the resource
        
        """

        token = get_token_auth_header()
        unverified_claims = jwt.get_unverified_claims(token)
        if unverified_claims.get("scope"):
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return True
        
        return False


    @app.route("/graphql", methods=["GET"])
    #@cross_origin(headers=["Content-type", "Authorization"])
    #@requires_auth
    def graphql_playground():
        return PLAYGROUND_HTML, 200
     
    @app.route("/graphql", methods=["POST"])
    #@cross_origin(headers=["Content-type", "Authorization"])
    #@requires_auth
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

