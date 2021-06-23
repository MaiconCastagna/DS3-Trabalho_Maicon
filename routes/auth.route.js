const express = require('express');
const router = express.Router();
// Inicializa os models
const { User } = require('../models');
const { Maker } = require('../models');

router.get('/signup', (req, res) => res.render('signup'));
router.get('/signin', (req, res) => res.render('signin'));
router.get('/maker_signin', (req, res) => res.render('maker_signin'));

//-----------------------------------------------------------------
// Usuário

router.post('/login', async (req, res) => {
  console.log('Fazendo login:', req.body.username);

  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });

  if (user) {
    if (user.password === req.body.password) {
      req.session.loggedIn = true;
      req.session.user = user.get({ plain: true });
      return res.redirect('/');
    }
  }
  return res.status(404).render('signin', {
    errorMessage: 'Credenciais inválidas'
  });

});

//-----------------------------------------------------------------
// Ambos

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    req.session.maker = null;
    req.session.user = null;
  }

  return res.redirect('/');
})

//-----------------------------------------------------------------

router.post('/register', async (req, res) => {
  const user = req.body;

  try {
    const createdUser = await User.create(user);
    console.log('Usuário criado: ', createdUser);

    return res.redirect('/auth/signin');
  } catch (e) {
    console.log('Error: ', e);
    return res.status(400).render('signup', {
      errorMessage: 'Não foi possível criar esta conta de usuário'
    });
  }
});

//-----------------------------------------------------------------
// Maker

router.post('/register_maker', async (req, res) => {
  const maker = req.body;

  try {
    const createdMaker = await Maker.create(maker);
    console.log('conta Maker criada: ', createdMaker);

    return res.redirect('/auth/maker_signin');
  } catch (e) {
    console.log('Error: ', e);
    return res.status(400).render('maker_signup', {
      errorMessage: 'Não foi possível criar esta conta de usuário'
    });
  }
});

router.post('/login_maker', async (req, res) => {
  console.log('Fazendo login (maker):', req.body.username);

  const maker = await Maker.findOne({
    where: {
      username: req.body.username
    }
  });

  if (maker) {
    if (maker.password === req.body.password) {
      req.session.loggedIn = true;
      req.session.maker = maker.get({ plain: true });
      req.session.makerId = maker.id;
      id = maker.id;
      return res.redirect('/makers/maker/' + id);
    }
  }
  return res.status(404).render('maker_signin', {
    errorMessage: 'Credenciais inválidas!'
  });

});

module.exports = router;
