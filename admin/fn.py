from db import flatdosh, g, r
import json


def add_members(id, xs):
    return (
        flatdosh.groups.get(id)
        .update({'members': r.row['members']
        .add(xs)})
        .run()
        )

def groups():
    for group, id in g.iteritems():
        print ' * ' + group
        for member in flatdosh.groups.get(id)['members'].run():
            print '    - ' + member

def history(name):
    group = g[name]
    history = list(
        flatdosh.expenses.filter({'group': group})
        .with_fields('email', 'amount', 'description', 'timestamp', 'creator')
        .order_by(r.desc('timestamp'))
        .run())

    for e in history:
        e['timestamp'] = str(e['timestamp'])

    print json.dumps(history, indent=2)


def users():
    users = list(flatdosh.users.without('shared', 'groups', 'password').run())
    print json.dumps(users, indent=2)

def kill(user):
    return flatdosh.users.get(user).delete().run()
