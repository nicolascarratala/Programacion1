import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Initialize Flask RESTful, SQLAlchemy, JWTManager
api = Api()
db = SQLAlchemy()
jwt = JWTManager()


def create_app():

    # Initialize Flask
    app = Flask(__name__)

    # Load .env file
    load_dotenv()

    # get .env database path, database name, expires token time and secret key
    env_path = os.getenv('DATABASE_PATH')
    env_name = os.getenv('DATABASE_NAME')
    token_expires = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    secret_key = os.getenv('JWT_SECRET_KEY')

    # if path exist get true
    db_path = os.path.exists(env_path + env_name)

    # If db file dont exist create one
    if not db_path:
        os.system(f'touch ${env_path}${env_name}')

    # dont save db changes
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Url config BD
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + env_path + env_name

    # Init db
    db.init_app(app)

    # Import resources then db initialization
    import main.resources as resources

    # Api endpoints Resources
    api.add_resource(resources.UsersResource, '/users')  # Users
    api.add_resource(resources.UserResource, '/user/<id>')  # Users by id
    api.add_resource(resources.PoemsResource, '/poems')  # Poems
    api.add_resource(resources.PoemResource, '/poem/<id>')  # Poems by id
    api.add_resource(resources.ReviewsResource, '/reviews')  # Reviews
    api.add_resource(resources.ReviewResource, '/review/<id>')  # Reviews by id

    # Init api
    api.init_app(app)

    # Cargar clave secreta
    app.config['JWT_SECRET_KEY'] = secret_key

    # Get token expires time
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = token_expires

    # Init jwt
    jwt.init_app(app)

    from main.auth import routes

    # Import blueprint for routes.auth
    app.register_blueprint(routes.auth)

    return app
