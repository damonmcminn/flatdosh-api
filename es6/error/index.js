export default function errorHandler(err, req, res, next) {

  console.log(err);
  res.sendStatus(400);

}
