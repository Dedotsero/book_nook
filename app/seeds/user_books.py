from app.models import db, UserBooks

def seed_user_books():
    user1book1 = UserBooks(
        user_id=1, book_id=1
    )

    db.session.add(user1book1)

    db.session.commit()

def undo_user_books():
    db.session.execute('TRUNCATE portfolio_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
