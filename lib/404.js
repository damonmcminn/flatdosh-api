"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (req, res, next) {
  res.status(404).json({ message: "Cannot " + req.method + " " + req.path });
};

module.exports = exports["default"];
//# sourceMappingURL=404.js.map