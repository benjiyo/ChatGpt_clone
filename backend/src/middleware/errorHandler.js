export default function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: false, message: 'Invalid JSON body' });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ status: false, message: err.message });
  }
  console.error(err);
  res
    .status(500)
    .json({ status: false, message: 'Something went wrong try again later' });
}
