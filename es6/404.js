export default function(req, res, next) {
  res.status(404).json({message: `Cannot ${req.method} ${req.path}`});
}
