export default function(req, res, next) {

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization'
  });
  next();

}
