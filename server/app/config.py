from environs import Env

env = Env()
env.read_env()

def create_config_obj(env_setting):
    new_config = Config()
    with env.prefixed(env_setting):
        new_config.PORT = env.str("PORT")
        new_config.DEBUG = env.bool("DEBUG", default=False)
        new_config.TESTING = env.bool("TESTING", default=False)
    return new_config

class Config(object):
    HOST = env.str(
        "PROD_HOST", default=env.str("DEV_HOST")
    )
    PORT = env.int(
        "PROD_PORT", default=env.int("DEV_PORT")
    )

    MONGO_URI = env.str(
        "PROD_DB", default=env.str("DEV_HOST")
    )
    
    SECRET_KEY = env.str(
        "SECRET_KEY"
    )

dev_config = create_config_obj("DEV_")
prod_config = create_config_obj("PROD_")
