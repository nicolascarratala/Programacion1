from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PoemsModel, UsersModel
from ..utils import poemFilters, generalPagination
from main.auth.decorators import admin_required
from flask_jwt_extended import jwt_required

#Recurso poema
class Poem(Resource):
    #Obtener recurso
    @jwt_required
    def get(self, id):
        poem = db.session.query(PoemsModel).get_or_404(id)
        return poem.to_json()

    #Modificar recurso
    @admin_required
    def put(self, id):
        poem = db.session.query(PoemsModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(poem, key, value)
        db.session.add(poem)
        db.session.commit()
        return poem.to_json(), 201
    
    #Eliminar recurso
    @admin_required
    def delete(self, id):
        try:
            poem = db.session.query(PoemsModel).get_or_404(id)
            db.session.delete(poem)
            db.session.commit()
            return '', 204
        except:
            return 'Resource not found', 404

#Recurso poemas
class Poems(Resource):
    #Obtener recursos

    def get(self):
        poems = db.session.query(PoemsModel)
        
        return jsonify({
            'poems': [poem.to_json() for poem in poems],

        })

    #Insertar recurso
    @admin_required
    def post(self):
        poem = PoemsModel.from_json(request.get_json())
        try:
            db.session.add(poem)
            db.session.commit()
        except:
            return 'Incorrect format', 400
        return poem.to_json(), 201