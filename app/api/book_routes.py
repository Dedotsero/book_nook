from flask import Blueprint, jsonify, request
from sqlalchemy import or_
import requests
from flask_login import login_required, current_user
from app.models import db, Books, User

books_routes = Blueprint("books", __name__)

@books_routes.route("/")
# @login_required
def library():
    library_books = Books.query.all()
    return {"library" : [book.to_dict() for book in library_books]}

@books_routes.route("/<isbn>")
# @login_required
def get_book(isbn):
    book_in_library = Books.query.filter(
        or_(Books.isbn_13 == isbn,
        Books.isbn_10 == isbn)
    ).one()
    if book_in_library:
        return book_in_library.to_dict()


@books_routes.route("/<isbn>", methods=["POST", "DELETE"])
# @login_required
def library_update(isbn):
    if request.method == "POST":
        book_already_in_library = User.query.filter(
            User.id == current_user.id,
            or_(Books.isbn_13 == isbn,
            Books.isbn_10 == isbn)
        ).one_or_none()

        if book_already_in_library:
            return book_already_in_library.to_dict()
        isbn_response = requests.get(f"https://openlibrary.org/isbn/{isbn}.json").json()
        # print(">>>>>>>>>>>>>>>>>", isbn_response)
        title = isbn_response["title"]
        publication_date = isbn_response["publish_date"]
        page_count = isbn_response["number_of_pages"]
        isbn_10 = isbn_response["isbn_10"][0]
        isbn_13 = isbn_response["isbn_13"][0]
        aolid = isbn_response["authors"][0]["key"]
        # print(">>>>>>>>>>>>>>>>>", aolid)
        author_response = requests.get(f"https://openlibrary.org/{aolid}.json").json()
        # print(">>>>>>>>>>>>>>>>>", author_response)
        author = author_response["personal_name"]
        wolid = isbn_response["works"][0]["key"]
        # print(">>>>>>>>>>>>>>>>>", wolid)
        works_response = requests.get(f"https://openlibrary.org/{wolid}.json").json()
        # print(">>>>>>>>>>>>>>>>>", works_response.get("description"))
        synopsis = works_response.get("description")
        if not synopsis:
            synopsis = "No Description"
        book_cover_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg"
        new_book = Books(
            author=author,
            title=title,
            publication_date=publication_date,
            page_count=page_count,
            book_cover_url=book_cover_url,
            synopsis=synopsis,
            isbn_10=isbn_10,
            isbn_13=isbn_13,
        )
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict()
    elif request.method == "DELETE":
        deleted_book = User.query.filter(
            User.id == current_user.id,
            Books.isbn_13 == isbn,
            Books.isbn_10 == isbn
        ).one_or_none()
        db.session.delete(deleted_book)
        db.session.commit()
        return deleted_book.to_dict()

# returned isbn object
# Rangers Apprentice
# {
#     "publishers": ["Puffin Books"],
#     "number_of_pages": 368,      ******
#     "covers": [8846034],
#     "physical_format": "paperback",
#     "full_title": "The Battle of Hackham Heath",
#     "last_modified": {"type": "/type/datetime", "value": "2020-08-30T21:20:21.246536"},
#     "latest_revision": 2,
#     "key": "/books/OL27383129M",
#     "authors": [{"key": "/authors/OL2660074A"}], ******
#     "source_records": ["amazon:0142427330", "bwb:9780142427330"],
#     "title": "The Battle of Hackham Heath",      ******
#     "notes": {"type": "/type/text", "value": "Source title: The Battle of Hackham Heath (Ranger's Apprentice: The Early Years)"},
#     "identifiers": {"amazon": ["0142427330"]},
#     "created": {"type": "/type/datetime", "value": "2019-10-08T11:06:47.569215"},
#     "isbn_13": ["9780142427330"],    *******
#     "isbn_10": ["0142427330"],       *******
#     "publish_date": "Oct 10, 2017",  *******
#     "works": [{"key": "/works/OL20040867W"}],    ******
#     "type": {"key": "/type/edition"},
#     "revision": 2
# }
# Chronicles of the Black Company
# {
#     "publishers": ["Tor Books"],
#     "number_of_pages": 704,
#     "weight": "1.6 pounds",
#     "isbn_10": ["0765319233"],
#     "covers": [2615787],
#     "local_id": ["urn:phillips:31867003070633",
#     "urn:sfpl:31223088583514", "urn:sfpl:31223088583365"],
#     "physical_format": "Paperback",
#     "lc_classifications": ["PS3553.O5536C48 2007",
#     "PS3553.O5536 C48 2007"],
#     "key": "/books/OL10936449M",
#     "authors": [{"key": "/authors/OL237627A"}],
#     "ocaid": "chroniclesofblac00cook",
#     "isbn_13": ["9780765319234"],
#     "source_records": ["amazon:0765319233",
#     "marc:marc_loc_updates/v35.i25.records.utf8:14033491:685",
#     "marc:marc_loc_updates/v38.i08.records.utf8:7026771:911",
#     "marc:marc_loc_updates/v38.i11.records.utf8:8818422:1313",
#     "ia:chroniclesofblac00cook",
#     "marc:marc_openlibraries_phillipsacademy/PANO_FOR_IA_05072019.mrc:34030212:1849",
#     "marc:marc_openlibraries_sanfranciscopubliclibrary/sfpl_chq_2018_12_24_run04.mrc:55541400:2346",
#     "bwb:9780765319234",
#     "marc:marc_loc_2016/BooksAll.2016.part34.utf8:131940955:1313",
#     "ia:gardenage0000unse"],
#     "title": "Chronicles of the Black Company",
#     "identifiers": {"goodreads": ["400924"],
#     "librarything": ["1232660"]},
#     "languages": [{"key": "/languages/eng"}],
#     "subjects": ["Science Fiction And Fantasy", "Fiction", "Fiction - Fantasy", "Fantasy", "Fantasy - General", "Fiction / Fantasy / General", "Fantasy fiction"],
#     "publish_date": "November 13, 2007",
#     "oclc_numbers": ["144771486"],
#     "works": [{"key": "/works/OL1976776W"}],
#     "type": {"key": "/type/edition"},
#     "physical_dimensions": "8.8 x 6.1 x 1.9 inches",
#     "lccn": ["2007024922"],
#     "latest_revision": 17,
#     "revision": 17,
#     "created": {"type": "/type/datetime", "value": "2008-04-30T09:38:13.731961"},
#     "last_modified": {"type": "/type/datetime", "value": "2021-01-23T15:50:56.953393"}
# }

# returned author object
# Rangers Apprentice
# {
#     "bio": {"type": "/type/text", "value": "John Anthony Flanagan is an Australian fantasy author best known for his medieval fantasy series, the *Ranger's Apprentice*, and its sister series, the *Brotherband Chronicles*. Some of his other works include his *Storm Peak* duology, as well as the adult novel *The Grey Raider*."},
#     "name": "John Flanagan",
#     "personal_name": "Flanagan, John",     ******
#     "created": {"type": "/type/datetime", "value": "2008-04-29T13:35:46.876380"},
#     "alternate_names": ["Flanagan, John", "John Anthony Flanagan"],
#     "photos": [6636167],
#     "last_modified": {"type": "/type/datetime", "value": "2020-09-30T12:02:10.023928"},
#     "latest_revision": 7,
#     "key": "/authors/OL2660074A",
#     "birth_date": "22 May 1944",
#     "revision": 7,
#     "type": {"key": "/type/author"},
#     "remote_ids": {"viaf": "85841451", "wikidata": "Q181730", "isni": "0000000114507820"}
# }

# returned works object
# Rangers Apprentice
# {
#     "subtitle": "The Early Years: The Battle of Hackham Heath",
#     "description": "As Morgarath recruits an army of Wargals, Halt ventures into enemy territory to uncover the extent of Morgarath's plan of attack.",      *******
#     "last_modified": {"type": "/type/datetime",
#     "value": "2020-08-30T21:20:21.246536"},
#     "title": "Ranger's Apprentice",
#     "created": {"type": "/type/datetime",
#     "value": "2019-07-19T17:57:24.175798"},
#     "covers": [8846034],
#     "subjects": ["Fantasy", "Adventure and adventurers", "Fiction", "Children's fiction", "Soldiers, fiction", "Adventure and adventurers, fiction", "War, fiction", "Fantasy fiction"],
#     "latest_revision": 3,
#     "key": "/works/OL20040867W",
#     "authors": [{"type": {"key": "/type/author_role"}, "author": {"key": "/authors/OL2660074A"}}],
#     "type": {"key": "/type/work"},
#     "revision": 3
# }
# Chronicles of the Black Company
# {
#     "covers": [2615787],
#     "first_publish_date": "November 13, 2007",
#     "latest_revision": 5, "key": "/works/OL1976776W",
#     "authors": [{"type": {"key": "/type/author_role"},
#     "author": {"key": "/authors/OL237627A"}}],
#     "subjects": ["Fantasy fiction", "Fiction, fantasy, general"],
#     "created": {"type": "/type/datetime", "value": "2009-12-09T22:39:22.632893"},
#     "title": "Chronicles of the Black Company",
#     "last_modified": {"type": "/type/datetime",
#     "value": "2020-08-14T19:12:34.377431"},
#     "type": {"key": "/type/work"}, "revision": 5
# }
