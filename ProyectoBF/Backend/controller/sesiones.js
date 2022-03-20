//Usarla cuando queremos validar si la sesión está iniciada
function auth(req, res, next) {
    if (req.session.ingresado)
      return next();
    else
      return res.sendStatus(401);
  };

  module.exports = auth;