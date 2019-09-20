from ariadne import ObjectType, graphql_sync, make_executable_schema, load_schema_from_path, ScalarType
from ariadne.constants import PLAYGROUND_HTML
from app.config import dev_config, prod_config
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import os


def create_app(config = dev_config):

    

    type_defs = load_schema_from_path('app/graphql/schema.graphql')

    query = ObjectType("Query")
    datetime = ScalarType("Datetime")

    app = Flask(__name__)
    
    if "FLASK_ENV" in os.environ and os.environ["FLASK_ENV"] == "production":
        config = prod_config
    app.config.from_object(config)

    mongo = PyMongo(app)

    @datetime.serializer
    def serialize_datetime(value):
        return value.isoformat()

    @query.field("User")
    def resolve_user(_, info):
        print(info)
    
    schema = make_executable_schema(type_defs, query)

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

