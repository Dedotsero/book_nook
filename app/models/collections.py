from .db import db

class Collections(db.Model):

    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, default="Your Library")
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)

    owner = db.relationship("CollectionBooks", back_populates="collections")
    user = db.relationship("User", back_populates="collections")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
        }
