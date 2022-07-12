from .. import db


class Poems(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(100), nullable=False)
    user = db.relationship(
        'Users', back_populates="poems", uselist=False, single_parent=True)
    reviews = db.relationship(
        'Review', back_populates="poems", cascade="all, delete-orphan")
    userID = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # region Functions

    def __repr__(self) -> str:
        """Debug def

        Keyword arguments:
        self

        Return: str
        """
        return '<Poema: %r %r >' % (self.title, self.content)

    def to_json(self):
        """This function obtains poems and return a JSON object

        Keyword arguments:
        self

        Return: json
        """

        poem_json = {
            'id': self.id,
            'title': str(self.title),
            'content': str(self.content),
            'userID':str(self.userID)
        }
        return poem_json

    @staticmethod
    def from_json(poem_json):
        """This get a JSON and return a Poems object

        Keyword arguments:
        poem_json - json object

        Return: Poems object
        """
        id = poem_json.get('id')
        title = poem_json.get('title')
        content = poem_json.get('content')
        userID = poem_json.get('userID')
        return Poems(id=id, title=title, content=content, userID=userID)

    # endregion
