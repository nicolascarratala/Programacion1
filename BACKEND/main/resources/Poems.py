from flask_restful import Resource
from flask import request, jsonify
from main.auth.decorators import admin_required
from .. import db
from main.models import PoemsModel
from ..utils import poemFilters, generalPagination
from flask_jwt_extended import jwt_required


# Recurso Usuario
class Poem(Resource):

    # Obtener recurso
    @jwt_required
    def get(self, id):
        poem = db.session.query(PoemsModel).get_or_404(id)
        return poem.to_json()

    # Eliminar recurso
    @admin_required
    def delete(self, id):
        try:
            poem = db.session.query(PoemsModel).get(id)
            db.session.delete(poem)
            db.session.commit()
            return '', 204
        except:
            return 'Resource not found', 404

    # Modificar recurso
    @admin_required
    def put(self, id):
        user = db.session.query(PoemsModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201


# Recurso Usuarios
class Poems(Resource):

    # Obtener lista de recursos
    @jwt_required
    def get(self):

        poems = db.session.query(PoemsModel)
        pageCongf = generalPagination(request)
        poems = poemFilters(request, PoemsModel, poems)
        poems = poems.paginate(
            pageCongf["page"], pageCongf["per_page"], True, 30)

        return jsonify({
            'reviews': [poem.to_json() for poem in poems.items],
            'total': poems.total,
            'pages': poems.pages,
            'page': pageCongf["page"]
        })

    @admin_required
    # Insertar recurso
    def post(self):
        poem = PoemsModel.from_json(request.get_json())
        try:
            db.session.add(poem)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return poem.to_json(), 201
