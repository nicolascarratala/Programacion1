from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ReviewModel
from ..utils import reviewFilters, generalPagination
from flask_jwt_extended import jwt_required
from main.auth.decorators import admin_required

#Recurso Review
class Review(Resource):
    #Obtener recurso
    @jwt_required
    def get(self, id):
        review = db.session.query(ReviewModel).get_or_404(id)
        return review.to_json()
    
    #Modificar recurso
    @admin_required
    def put(self, id):
        review = db.session.query(ReviewModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(review, key, value)
        db.session.add(review)
        db.session.commit()
        return review.to_json(), 201

    #Eliminar recurso
    @admin_required
    def delete(self, id):
        try:
            review = db.session.query(ReviewModel).get_or_404(id)
            db.session.delete(review)
            db.session.commit()
            return '', 204
        except:
            return 'Resource not found', 404

#Recurso Reviews
class Reviews(Resource):
    #Obtener recursos
    @jwt_required
    def get(self):
        req = request
        reviews = db.session.query(ReviewModel)
        pageCongf = generalPagination(req)
        reviews   = reviewFilters(req, ReviewModel, reviews)
        reviews   = reviews.paginate(pageCongf["page"], pageCongf["per_page"], True, 30)

        return jsonify({
            'reviews': [review.to_json() for review in reviews.items],
            'total': reviews.total,
            'pages': reviews.pages,
            'page': pageCongf["page"]
        })

    #Insertar recurso
    @admin_required
    def post(self):
        review = ReviewModel.from_json(request.get_json())
        db.session.add(review)
        db.session.commit()
        return review.to_json(), 201