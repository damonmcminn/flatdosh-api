#! /usr/bin/python
# coding=utf8
import argparse
import fn
import json

parser = argparse.ArgumentParser(description='flatdosh admin')
parser.add_argument('-u', '--users', action='store_true')
parser.add_argument('-g', '--groups', action='store_true')
parser.add_argument('-H', '--history')
parser.add_argument('--add')
parser.add_argument('-m', '--members')
parser.add_argument('--kill')

args = parser.parse_args()

if args.users:
    fn.users()

if args.groups:
    fn.groups()

if args.history:
    fn.history(args.history)

if args.add and args.members:
    members = args.members.split(',')
    fn.add_members(g[args.add], members)
    fn.groups()

if args.kill:
    confirmed = raw_input('Are you sure? (y/N) ')
    if confirmed.lower() == 'y':
        result = fn.kill(args.kill)
        if result['deleted']:
            print 'Deleted: ' + args.kill
        else:
            print 'Failure:'
            print json.dumps(result, indent=2)
