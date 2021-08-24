from .db import db

class Comments(db.Model):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(
        "books.id", ondelete="CASCADE"), nullable=False)

    user = db.relationship("User", back_populates="comments")
    book = db.relationship("Books", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "book_id": self.book_id
        }
