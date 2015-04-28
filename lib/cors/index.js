'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (req, res, next) {

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': '*' });

  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = exports['default'];
//# sourceMappingURL=index.js.map