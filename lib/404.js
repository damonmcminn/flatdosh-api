"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (req, res, next) {
  res.status(404).json({ message: "Cannot " + req.method + " " + req.path });
};

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjQwNC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cUJBQWUsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN0QyxLQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sY0FBWSxHQUFHLENBQUMsTUFBTSxTQUFJLEdBQUcsQ0FBQyxJQUFJLEFBQUUsRUFBQyxDQUFDLENBQUM7Q0FDckUiLCJmaWxlIjoiNDA0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLnN0YXR1cyg0MDQpLmpzb24oe21lc3NhZ2U6IGBDYW5ub3QgJHtyZXEubWV0aG9kfSAke3JlcS5wYXRofWB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==