# coding=utf8
import rethinkdb as r
import json

r.connect().repl()

fd = r.db('flatdosh')

class DB:
    def __init__(self):
        self.groups = fd.table('groups')
        self.users = fd.table('users')
        self.expenses = fd.table('expenses')

db = DB()

def add_members(id, xs):
    return (
        db.groups.get(id)
        .update({'members': r.row['members']
        .add(xs)})
        .run()
        )

g = {}
for group in db.groups.run():
    g[group['name']] = group['id']

def groups():
    for group, id in g.iteritems():
        print ' * ' + group
        print '   ' + id
        for member in db.groups.get(id)['members'].run():
            print '    - ' + member

def history(group):
    history = list(
        db.expenses.filter({'group': group})
        .with_fields('email', 'amount', 'description', 'timestamp', 'creator')
        .order_by(r.desc('timestamp'))
        .run())

    for e in history:
        e['timestamp'] = str(e['timestamp'])

    print json.dumps(history, indent=2)

history(g['local'])
