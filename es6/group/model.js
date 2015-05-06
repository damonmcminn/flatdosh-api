import db from '../db';

const r = db.r;
const conn = db.conn;

const groups = r.table('groups');

export default {members, getMembers}

function members(group) {

  // validation that user requesting group info
  // belongs to group
  // must come from elsewhere
  // like balance/controller

  return groups.get(group)
    .getField('members')
    .outerJoin(r.table('users'), (member, user) => member.eq(user('id')))
    .map(u => {
      return {
        email: u('left'),
        name: u('right')('name').default(u('left'))
      }
    })
}

function getMembers(group) {
  return members(group)
    .run(conn)
    .then(db.toArray);
}
