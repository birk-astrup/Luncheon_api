# Luncheon API

## Introduction

This is the API that serves the Netcompany lunch app. Data is served from a MongoDB cluster to the client with Graphql.

---

## URL

The API can be accessed at: [https://net-lunch.herokuapp.com/graphql](https://net-lunch.herokuapp.com/graphql)

---

## Prerequisites

To install and run the Luncheon API you need:

* Python version: > 3.7.0
* Docker version: > 19.0.0
* A running instance of MongoDB version: > 4.0
  
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

### MongoDB

There are several ways to configure MongoDB for this project:

* Install MongoDB locally on your machine.

* Use MongoDB Atlas to use a MongoDB cluster in the cloud.

* Pull a Mongo Docker image from the [Mongo Dockerhub](https://hub.docker.com/_/mongo).
  
    1. Pull the image with `docker pull mongo:latest`.
    2. Run the image with `docker run --name mongo mongo:latest`.
    3. The docker container can now be accessed at localhost:27017

#### Working with the database

To view your database in Mongo, either install [Mongo Compass](https://www.mongodb.com/download-center/compass) or [Robo 3T](https://robomongo.org/).

#### Connect the application to the database

Specify the `MONGO_URI` environment variable to connect to application to the database.

To connect to a Mongo instance running in a Docker container accessible at localhost:27017:
    * 


