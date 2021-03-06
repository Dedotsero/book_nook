from .db import db

class Collections(db.Model):

    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, default="Your Library")
    default = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)

    owner = db.relationship("CollectionBooks", back_populates="collections")
    users = db.relationship(
        "User", back_populates="collections", passive_deletes=True)
    books = db.relationship(
        "Books", secondary="collection_books", back_populates="collections")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "default": self.default,
            "user_id": self.user_id,
            "books": [b.to_dict() for b in self.books]
        }
