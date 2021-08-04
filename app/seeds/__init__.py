from flask.cli import AppGroup
from .users import seed_users, undo_users
from .books import seed_books, undo_books
from .collection_books import seed_collection_books, undo_collection_books
from .collections import seed_collections, undo_collections
from .comments import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_books()
    seed_collections()
    seed_collection_books()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_books()
    undo_collections()
    undo_collection_books()
    undo_comments()
    # Add other undo functions here
