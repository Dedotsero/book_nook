from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comments
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/book/<book_id>", methods=["POST"])
# @login_required
def newComment(book_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comments(
            content=form.data["content"],
            user_id=current_user.id,
            book_id=book_id
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@comment_routes.route("/book/<book_id>")
# @login_required
def bookComments(book_id):
    all_book_comments = Comments.query.filter(
        Comments.book_id == book_id).all()
    return {"comment": [comment.to_dict() for comment in all_book_comments]}


@comment_routes.route("/<id>", methods=["PUT", "DELETE"])
# @login_required
def updateComment(id):
    comment = Comments.query.get_or_404(id)
    if request.method == "PUT":
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment.body = form.body.data
            db.session.commit()
            return comment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(comment)
        db.session.commit()
        return
