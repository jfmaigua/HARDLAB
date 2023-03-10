
module.exports = auth;
module.exports = (req, res, next) => {
    const { role } = req.user;
    if (role === 'admin' || role === 'user') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };