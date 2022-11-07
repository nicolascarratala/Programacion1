from flask import request, Blueprint
from .. import db
from main.models import UsersModel
from flask_jwt_extended import create_access_token
from main.mail.functions import sendMail

#Blueprint to access autentication methods
auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['POST'])
def login():

    # Search User whit email
    user = db.session.query(UsersModel).filter(UsersModel.email == request.get_json().get("email")).first_or_404()


    # Validate Password
    if user.validate_pass(request.get_json().get("password")):

        # Generate new token and and obtain identity from user
        access_token = create_access_token(identity=user)

        # Return values and token
        data = {
            'id': str(user.id),
            'email': user.email,
            'access_token': access_token
        }

        return data, 200
    else:
        return 'Incorrect password', 401

@auth.route('/register', methods=['POST'])
def register():
    user = UsersModel.from_json(request.get_json())  #Get User
    #Verify if email exist in db
    exists = db.session.query(UsersModel).filter(UsersModel.email == user.email).scalar() is not None

    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            # Add User to db
            db.session.add(user)
            db.session.commit()
            sent = sendMail([user.email], 'Welcome', 'register', user=user)
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return user.to_json(), 201