
def prepare(object):
    """Converts _id from ObjectId to string."""
    print(object)
    object['_id'] = str(object['_id'])
    return object

    
