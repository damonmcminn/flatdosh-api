export default function(req, res, next) {

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': '*',
  });

  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200);
  } else {
    next();
  }

}
