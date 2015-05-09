#! /usr/bin/python
# coding=utf8
import rethinkdb as r
import json

import argparse

r.connect().repl()

fd = r.db('flatdosh')
class DB:
    def __init__(self):
        self.groups = fd.table('groups')
        self.users = fd.table('users')
        self.expenses = fd.table('expenses')


db = DB()
g = {}

for group in db.groups.run():
    g[group['name']] = group['id']

def add_members(id, xs):
    return (
        db.groups.get(id)
        .update({'members': r.row['members']
        .add(xs)})
        .run()
        )

def groups():
    for group, id in g.iteritems():
        print ' * ' + group
        #print '   ' + id
        for member in db.groups.get(id)['members'].run():
            print '    - ' + member

def history(name):
    group = g[name]
    history = list(
        db.expenses.filter({'group': group})
        .with_fields('email', 'amount', 'description', 'timestamp', 'creator')
        .order_by(r.desc('timestamp'))
        .run())

    for e in history:
        e['timestamp'] = str(e['timestamp'])

    print json.dumps(history, indent=2)

def users():
    users = list(db.users.without('shared', 'groups', 'password').run())
    print json.dumps(users, indent=2)

parser = argparse.ArgumentParser(description='flatdosh admin')
parser.add_argument('-u', '--users', action='store_true')
parser.add_argument('-g', '--groups', action='store_true')
parser.add_argument('-H', '--history')

args = parser.parse_args()

if args.users:
    users()

if args.groups:
    groups()

if args.history:
    history(args.history)
