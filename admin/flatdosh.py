import rethinkdb as r

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
    print 'GROUPS:'
    for group, id in g.iteritems():
        print ' * ' + group
        print '   ' + id
        for member in db.groups.get(id)['members'].run():
            print '    - ' + member
