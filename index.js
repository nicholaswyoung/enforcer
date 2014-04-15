module.exports = function (req, res, next) {
  var https = req.secure;

  if (!https) {
    https = ('https' === req.headers['x-forwarded-proto']);
  }

  if (https) return next();
  
  if ('GET' === req.method) {
    return res.redirect(
      301,
      'https://' + req.header('host') + req.originalUrl
    );
  } else {
    return res.send(403, 'Please use HTTPS.');
  }
}
