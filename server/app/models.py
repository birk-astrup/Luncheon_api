from datetime import datetime
import uuid

class User():

    def __init__(self, id, nickname, email):
        self.id = id
        self.nickname = nickname
        self.email = email

class Timestamp():

    def __init__(self, id):
        self.id = id
        self.timestamp = datetime.now

class UserPayload():

    def __init__(self, user, status):
        self.user = user
        self.status = status