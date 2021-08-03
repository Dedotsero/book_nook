from .db import db

class Books(db.Model):

    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    publication_date = db.Column(db.String, nullable=False)
    page_count = db.Column(db.Integer, nullable=False)
    book_cover_url = db.Column(db.String, nullable=False)
    synopsis = db.Column(db.Text)
    isbn_10 = db.Column(db.String, unique=True)
    isbn_13 = db.Column(db.String, unique=True)

    owner = db.relationship("CollectionBooks", back_populates="books")
    comments = db.relationship(
        "Comments", back_populates="book", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "author": self.author,
            "title": self.title,
            "publication_date": self.publication_date,
            "page_count": self.page_count,
            "book_cover_url": self.book_cover_url,
            "synopsis": self.synopsis,
            "isbn_10": self.isbn_10,
            "isbn_13": self.isbn_13,
        }
