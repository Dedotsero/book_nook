from app.models import db, Comments

def seed_comments():
    user1comment1 = Comments(
        content="This is a great book!", user_id=1, book_id=1
    )

    db.session.add(user1comment1)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE portfolio_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
