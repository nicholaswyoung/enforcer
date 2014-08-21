exports.https = function (options) {
  options = options || {};

  return function (req, res, next) {
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
    } else if ('HEAD' === req.method) {
      return next();
    } else {
      return res.send(403, 'Please use HTTPS.');
    }
  };
};

exports.http = function (options) {
  options = options || {};

  return function (req, res, next) {
    var https = req.secure;

    if (!https) {
      https = ('https' === req.headers['x-forwarded-proto']);
    }

    if (https) {
      return res.redirect(
        301,
        'http://' + req.header('host') + req.originalUrl
      );
    } else { return next(); }
  };
};
