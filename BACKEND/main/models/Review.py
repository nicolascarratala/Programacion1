from .. import db


class Review(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.id'))
    poemID = db.Column(db.Integer, db.ForeignKey('poems.id'))
    score = db.Column(db.Float, nullable=False)
    comment = db.Column(db.String(100), nullable=False)
    user = db.relationship(
        'Users', back_populates="reviews", uselist=False, single_parent=True)
    poems = db.relationship(
        'Poems', back_populates="reviews", uselist=False, single_parent=True)

    # region Functions

    def __repr__(self) -> str:
        """Debug def

        Keyword arguments:
        self

        Return: str
        """
        return '<Review: %r %r >' % (self.score, self.comment)

    def to_json(self):
        """This function obtains Review and return a JSON object

        Keyword arguments:
        self

        Return: json
        """
        review_json = {
            'id': self.id,
            'userID': self.userID,
            'poemID': self.poemID,
            'score': self.score,
            'user': self.user.to_json(),
            'poems': self.poems.to_json(),
            'comment': str(self.comment)
        }
        return review_json

    @staticmethod
    def from_json(review_json):
        """This get a JSON and return a Review python object

        Keyword arguments:
        review_json - json object

        Return: json
        """

        id = review_json.get('id')
        userID = review_json.get('userID')
        poemID = review_json.get('poemID')
        score = review_json.get('score')
        comment = review_json.get('comment')
        return Review(
            id=id, userID=userID, poemID=poemID, score=score, comment=comment)

    # endregion
