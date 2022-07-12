from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UserModel
from ..utils import userFilters, generalPagination
from main.auth.decorators import admin_required


# Recurso Usuario
class User(Resource):

    @jwt_required
    # Obtener recurso
    def get(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        return user.to_json()

    @admin_required
    # Eliminar recurso
    def delete(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

    @admin_required
    # Modificar recurso
    def put(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201


# Recurso Usuarios
class Users(Resource):

    # Obtener lista de recursos
    @jwt_required
    def get(self):
        users = db.session.query(UserModel)
        pageCongf = generalPagination(request)
        users = userFilters(request, UserModel, users)
        users = users.paginate(
            pageCongf["page"], pageCongf["per_page"], True, 30)

        return jsonify({
            'reviews': [user.to_json() for user in users.items],
            'total': users.total,
            'pages': users.pages,
            'page': pageCongf["page"]
        })

    @admin_required
    # Insertar recurso
    def post(self):
        user = UserModel.from_json(request.get_json())
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201
