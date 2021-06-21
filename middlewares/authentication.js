module.exports = function (req, res, next) {
  console.log('Action MD_AUTH')
  console.log('Usuário autenticado: ', req.session.loggedIn);

  if (req.session.loggedIn) {
    console.log('Usuário autorizado!');
    return next();
  }

  console.log('Sessão inválida!');

  res.status(401).redirect('/auth/signin');
};
