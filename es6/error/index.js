const CODES = {
  'AuthError': 401
}

export default function errorHandler(err, req, res, next) {

  console.log(err);
  let {message, name} = err;

  res.status(CODES[name] || 400).json({message, name});

}
