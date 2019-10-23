# :fork_and_knife: Luncheon API :fork_and_knife:

## Introduction

This is the API that serves the Netcompany lunch app. The application is built with Python Flask with Gunicorn as a Web Service Gateway Interface. Data is served from a MongoDB cluster on MongoDB Atlas to the client with GraphQL.

---

## URL

The API can be accessed at: [https://net-lunch.herokuapp.com/graphql](https://net-lunch.herokuapp.com/graphql)

---

## Prerequisites

To install and run the Luncheon API locally you need:

* Python version: > 3.7.0
* Pipenv version: > 2018.11.26
* Docker version: > 19.0.0
* A running instance of MongoDB version: > 4.0
  
---

## Technologies

<img src="https://flask.palletsprojects.com/en/1.1.x/_images/flask-logo.png" height="150"/>

This project uses The [flask](https://flask.palletsprojects.com/en/1.1.x/) microframework for server setup.

<br/>
<br/>

<img src="https://ariadnegraphql.org/docs/assets/logo-vertical.png" height="200"/>

For GraphQL support this project uses [Ariadne](https://ariadnegraphql.org/) which is a Python library for implementing schema-first GraphQL.

---

## Environment

All local environment configurations for the project is specified in a `.env` file. An `example.env` file is checked in to version control. This file contains the structure of the `.env` file that is used in the project. It looks like this:

```(.env)
#FLASK ENVIRONMENT
FLASK_APP="wsgi.py"
FLASK_RUN_PORT="5000"
FLASK_ENV="development"
​
#AUTH0 ENVIRONMENT
DOMAIN= "This is the Auth0 domain"
AUDIENCE= "This is the identifier of the API in Auth0"
ALGORITHM= "This is the algorithm which decrypts the access token from the client"

#MONGO ENVIRONMENT
MONGO_URI= "This is the MongoDB connection string."
```

All  environment variables pertaining to Auth0 can be found at the [Auth0 dashboard](https://auth0.com/).

---

## MongoDB

There are several ways to configure MongoDB for this project:

* Install MongoDB locally on your machine.

* Connect to a MongoDB cluster on [Atlas](https://www.mongodb.com/cloud/atlas).

* Pull a Mongo Docker image from the [Mongo Dockerhub](https://hub.docker.com/_/mongo).
  
    1. Pull the image with `docker pull mongo:latest`.
    2. Run the image with `docker run --name mongo mongo:latest`.
    3. The docker container can now be accessed at localhost:27017

### Working with the database

To view your database in Mongo, you can use:

* [Mongo Compass](https://www.mongodb.com/download-center/compass).
* [Robo 3T](https://robomongo.org/).
* Command prompt / terminal.

### Connect the application to the database

It is easy to connect to the database. Just specify the `MONGO_URI` environment variable.

Here are some examples:

* For a Mongo instance either running on your machine or as a docker container on the default port: `MONGO_URI=mongodb://localhost:27017/`

* To connect to a Mongo database on MongoDB Atlas: `MONGO_URI=mongodb+srv://<username>:<password>@luncheon-bhvg9.gcp.mongodb.net/test?retryWrites=true&w=majority`

---

## Run the Flask application locally

* Clone the repository.
* Create your own `.env` file from the `example.env` template and place it in the root folder.
* Specify the empty environment variables in the new `.env` file.
* In the root folder of the project run: `pipenv install` to create a virtual environment for the project and install dependencies.
* Run `pipenv run flask run` from the root directory to start the application server.

### Important note

The application is configured to require an access token from the client for the POST and GET routes. To get around this for local development just comment out these lines in `app/server.py`:

```python

@app.route("/graphql", methods=["GET"])
#@cross_origin(send_wildcard=True, headers=["Content-type","Authorization"])
#@requires_auth()
def graphql_playground():
    return PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"])
#@cross_origin(send_wildcard=True, headers=["Content-type", "Authorization"])
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
```
