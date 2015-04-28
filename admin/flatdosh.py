import rethinkdb as r

r.connect().repl()

fd = r.db('flatdosh')

class DB:
    def __init__(self):
        self.groups = fd.table('groups')
        self.users = fd.table('users')
        self.expenses = fd.table('expenses')

db = DB()
