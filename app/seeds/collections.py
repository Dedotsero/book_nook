from app.models import db, Collections

def seed_collections():
    collection1 = Collections(
        name="Rangers Apprentice", user_id=1
    )

    db.session.add(collection1)

    db.session.commit()


def undo_collections():
    db.session.execute('TRUNCATE portfolio_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
