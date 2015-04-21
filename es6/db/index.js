import r from 'rethinkdb';
import {name} from 'parse-config';

const self = {

  initialise: function() {

    if (!self.conn) {
      
      return r.connect({db: name})
        .then(function(conn) {

          self.conn = conn;
          self.r = r;
          
          return Promise.resolve(self);
        })
        .catch(function(err) {
          return Promise.reject(err);
        });
    }
  },

  toArray: function(cursor) {
    return cursor.toArray();
  }
}

export default self;
