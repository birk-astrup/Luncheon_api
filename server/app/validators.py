def check_if_exists(collection, query):
    return collection.find_one(query)
