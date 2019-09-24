from environs import Env

env = Env()
env.read_env()

class Config(object):

    AUDIENCE = env.str("AUDIENCE")
    ALGORITHM = env.str("ALGORITHM")
    DOMAIN = env.str("DOMAIN")

    def __init__(self, host, port, dbUri, debug = False):
        self.HOST = host
        self.PORT = port
        self.MONGO_URI = dbUri
        self.DEBUG = debug
        

def create_config_obj(env_setting):
    with env.prefixed(env_setting):
        new_config = Config(
            env.str("HOST"),
            env.str("PORT"),
            env.str("DB"),
            env.bool("DEBUG")
        )
    return new_config

dev_config = create_config_obj("DEV_")
prod_config = create_config_obj("PROD_")
