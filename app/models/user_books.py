from app.models import books
from.db import db

class UserBooks(db.Model):

    __tablename__ = "userbooks"

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(
        "books.id", ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)

    users = db.relationship(
        "Users", back_populates="user_books", passive_deletes=True)
    books = db.relationship(
        "Books", back_populates="user_books", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id
        }
