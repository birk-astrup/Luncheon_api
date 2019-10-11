#TODO: configure mongoclient as decorator

import datetime
import pprint

def prepare(object):
    """Converts _id from ObjectId to string."""
    print(object)
    object['_id'] = str(object['_id'])
    return object

def get_user(nickname, email, mongo):

    query = {'$and': [{'nickname': nickname}, {'email': email}]}

    with mongo:

        user = mongo.db.users.find_one(query)

        return user

#TODO: delete this function
def insert_user(user, mongo):

    with mongo:

        try:
            mongo.db.users.update_one(user, upsert=True)
            payload = {"status": True, "error": None, "user": user}
        
        except Exception:
            payload = {"status": False, "error": {"message": "could not insert new user"}}

        return payload

def check_if_today_is_registered(user, mongo):
    
    day = user["timestamp_to_register"].day
    month = user["timestamp_to_register"].month
    year = user["timestamp_to_register"].year

    result = {"error": None, "data": None}

    pipeline = [
        {"$match": { "$and": [{"nickname": user["nickname"]}, {"email": user["email"]}]}},
        {"$unwind": {"path": "$registered", "preserveNullAndEmptyArrays": True}},
        {"$project": 
            {"_id": 0, "today": 
                {"$and": [
                    {"$eq": [{"$dayOfMonth": "$registered"}, day]},
                    {"$eq": [{ "$month": "$registered"}, month]},
                    {"$eq": [{ "$year": "$registered"}, year]}
                ]}
            }
        },
        {"$match": {"today": True}}
    ]

    with mongo:
        try:
            for data in mongo.db.users.aggregate(pipeline):
                
                if data["today"] is True:
                    result["data"] = True
                    result["error"] = {"message": "lunch already registered"}
                

                else:
                    result["data"] = False
                
                return result

        except Exception:
            result["error"] = {"message": "could not check if date matched"}
    
    
    return result

def register_lunch(user, mongo, user_exists=False):

    filter_by = {"$and": [{"nickname": user["nickname"]}, {"email": user["email"]}]}

    update_to_apply = {"$set": 
        {
            "nickname": user["nickname"], 
            "email": user["email"]
        },
        "$push": {"registered": user["timestamp_to_register"]}
    }

    if user_exists is True:

        today_is_registered = check_if_today_is_registered(user, mongo)

        if today_is_registered["error"] is not None:
            payload = {"status": False, "error": today_is_registered["error"]}
            return payload

    with mongo:
        try:     
            mongo.db.users.update_one(filter_by, update_to_apply, upsert=True)
            payload = {"status": True, "error": None, "user": user}

        except Exception as ex:
            print(ex)
            payload = {"status": False, "error": {"message": "Error when registering lunch for today"}}

        return payload   
    
    return payload





    
