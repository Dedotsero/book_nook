from app.models import db, Books


def seed_books():
    user1book1 = Books(
        author="Flanagan, John",
        title="The Battle of Hackham Heath",
        publication_date="Oct 10, 2017",
        page_count=368,
        book_cover_url="http://covers.openlibrary.org/b/isbn/9780142427330-M.jpg",
        synopsis="As Morgarath recruits an army of Wargals, Halt ventures into enemy territory to uncover the extent of Morgarath's plan of attack.",
        isbn_10="0142427330",
        isbn_13=9780142427330,
        user_books_id=1
    )

    db.session.add(user1book1)

    db.session.commit()

def undo_books():
    db.session.execute('TRUNCATE portfolio_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
