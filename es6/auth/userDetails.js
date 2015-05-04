import User from '../user/model';

export default function(payload) {

  return User.get(payload.id);

}
