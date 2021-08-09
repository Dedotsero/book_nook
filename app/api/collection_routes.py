from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Collections
from app.forms import CollectionForm
from .auth_routes import validation_errors_to_error_messages

collection_routes = Blueprint("collections", __name__)

@collection_routes.route("/", methods=["GET", "POST"])
# @login_required
def collections():
    if request.method == "GET":
        all_collections = Collections.query.filter(
            Collections.user_id == current_user.id).all()
        return {"collection" : [collection.to_dict() for collection in all_collections]}
    elif request.method == "POST":
        form = CollectionForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_collection = Collections(
                name=form.data['name'],
                user_id=current_user.id
            )
            db.session.add(new_collection)
            db.session.commit()
            return {
                "id": new_collection.id,
                "name": new_collection.name,
                "user_id": new_collection.user_id
            }
        return {'errors': validation_errors_to_error_messages(form.errors)}

@collection_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
# @login_required
def updateCollections(id):
    collection = Collections.query.filter(
        Collections.id == id).one()
    if request.method == "GET":
        return collection.to_dict()
    elif request.method == "PUT":
        form = CollectionForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            collection.body = form.body.data
            db.session.commit()
            return collection.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(collection)
        db.session.commit()
        return
