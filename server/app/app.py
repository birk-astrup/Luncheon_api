from ariadne import ObjectType, graphql_sync, make_executable_schema, gql, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from config import dev_config, prod_config
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import os


def create_app(config = dev_config):

    

    type_defs = load_schema_from_path('schemas.graphql')

    query = ObjectType("Query")

    @query.field("User")
    def resolve_user(_, info):
        request = info.context
        user_agent = request.headers.get("User-Agent", "Guest")
        return "Hello, %s!" % user_agent
    
    schema = make_executable_schema(type_defs, query)

    app = Flask(__name__)
    if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] == "production":
        config = prod_config
    app.config.from_object(config)

    mongo = PyMongo(app)

    @app.route("/graphql", methods=["GET"])
    def graphql_playground():
        return PLAYGROUND_HTML, 200
    
    @app.route("/graphql", methods=["POST"])
    def graphql_server():
        data = request.get_json()

        success, result = graphql_sync(
            schema,
            data,
            context_value=request,
            debug=app.debug
        )
        status_code = 200 if success else 400
        return jsonify(result), status_code

    return app

