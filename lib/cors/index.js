'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (req, res, next) {

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE' });

  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FCQUFlLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXRDLEtBQUcsQ0FBQyxHQUFHLENBQUM7QUFDTixpQ0FBNkIsRUFBRSxHQUFHO0FBQ2xDLGtDQUE4QixFQUFFLDZCQUE2QjtBQUM3RCxrQ0FBOEIsRUFBRSxtQkFBbUIsRUFDcEQsQ0FBQyxDQUFDOztBQUVILE1BQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLEVBQUU7QUFDMUMsT0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNyQixNQUFNO0FBQ0wsUUFBSSxFQUFFLENBQUM7R0FDUjtDQUVGIiwiZmlsZSI6ImNvcnMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuXG4gIHJlcy5zZXQoe1xuICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQXV0aG9yaXphdGlvbiwgQ29udGVudC1UeXBlJyxcbiAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIERFTEVURScsXG4gIH0pO1xuXG4gIGlmIChyZXEubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdvcHRpb25zJykge1xuICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gIH0gZWxzZSB7XG4gICAgbmV4dCgpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==