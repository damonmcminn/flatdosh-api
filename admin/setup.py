import rethinkdb as r

import argparse

db = 'flatdosh'
host = 'localhost'
port = 28015

tables = ['users', 'expenses', 'groups', 'settled']

parser = argparse.ArgumentParser(description='RethinkDB admin')
parser.add_argument(
    '--drop',
    #dest='drop',
    action='store_true',
    default=None,
    help='Drop the database'
)

parser.add_argument(
    '--host',
    help='RethinkDB host',
    default='localhost'
)

parser.add_argument(
    '--port',
    help='RethinkDB port',
    default=28015
)

parser.add_argument(
    '--db',
    help='database name',
    default='flatdosh'
)

args = parser.parse_args()

# argv for host, port, etc

conn = r.connect(args.host, args.port, args.db)

databases = r.db_list().run(conn)

if args.drop and (db in databases):
    confirmed = raw_input('Are you sure? (y/N) ')
    if confirmed == 'y':
        print('Dropping database: {0}'.format(db))
        r.db_drop(db).run(conn)
    else:
        print('Aborting.')
elif args.drop:
    print('Database {0} does not exist'.format(db))


if not args.drop:

    # create database if not exist
    if not db in databases:
        print('Creating database: {0}'.format(db))
        r.db_create(db).run(conn)

    db_tables = r.table_list().run(conn)

    for table in tables:
        if table not in db_tables:
            print('Creating table: {0}'.format(table))
            r.table_create(table).run(conn)
        else:
            print('Table {0} already exists'.format(table))
