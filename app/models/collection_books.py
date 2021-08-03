from .db import db

class CollectionBooks(db.Model):

    __tablename__ = "collection_books"

    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey(
        "collections.id", ondelete="CASCADE"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(
        "books.id", ondelete="CASCADE"), nullable=False)

    collections = db.relationship(
        "Collections", back_populates="owner", passive_deletes=True)
    books = db.relationship(
        "Books", back_populates="owner", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "collection_id": self.collection_id,
            "book_id": self.book_id
        }
