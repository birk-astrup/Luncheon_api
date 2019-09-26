from flask_pymongo import PyMongo

mongo = PyMongo()

def prepare(object):
    """Converts _id from ObjectId to string"""
    object._id = str(object._id)
    return object
