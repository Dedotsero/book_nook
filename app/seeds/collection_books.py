from app.models import db, CollectionBooks

def seed_collection_books():
    collection1book1 = CollectionBooks(
        collection_id=1, book_id=1
    )

    db.session.add(collection1book1)

    db.session.commit()


def undo_collection_books():
    db.session.execute('TRUNCATE portfolio_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
