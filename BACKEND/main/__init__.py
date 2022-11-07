import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail


api = Api() #Inicializa API de Flask Restful
db = SQLAlchemy() #Inicializa SQLAlchemy
jwt = JWTManager() #Inicializa JWTManager
mailsender = Mail() #Inicializa FlaskMail

# Método que inicializará todos los módulos y devolverá la aplicación
def create_app():
    app = Flask(__name__) #Inicializa Flask
    mail = Mail(app)
    mail.init_app(app)

    load_dotenv() #Carga las variables de entorno

    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #No almacena en memoria todos los cambios de la DB
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME') #Url de configuración de base de datos 
    
    db.init_app(app)

    import main.resources as resources

    #Carga a la API los recursos
    #Todos los recursos
    api.add_resource(resources.PoemsResource, '/poems')
    api.add_resource(resources.UsersResource, '/users')
    api.add_resource(resources.ReviewsResource, '/reviews')
    #Recursos por ID
    api.add_resource(resources.PoemResource, '/poem/<id>')
    api.add_resource(resources.UserResource, '/user/<id>')
    api.add_resource(resources.ReviewResource, '/review/<id>')
    
    api.init_app(app) #Cargar la aplicacion en la API de Flask Restful

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY') #Cargar clave secreta
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')) #Cargar tiempo de expiración de los tokens

    jwt.init_app(app)

    from main.auth import routes

    app.register_blueprint(routes.auth) #Import blueprint for routes.auth

    #Configuracion de mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

    mailsender.init_app(app)

    return app