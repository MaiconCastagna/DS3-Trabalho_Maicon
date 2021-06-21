const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User } = require('../models');

const md_auth = require('../middlewares/authentication');

//-----------------------------------------------------------
// Rotas CRUD normais

router.post('/', async (req, res) => {
  let user = await User.create(req.body);
  return res.send(user);
});

router.get('/', [md_auth], async (req, res) => {
  const users = await User.findAll();
  res.render('users', { users });
});

router.get('/:id', async (req, res) => {
  const id = req.params.userId;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }
  return res.send(user);
});

router.get('/:userId/edit', async (req, res) => {
  const id = req.params.userId;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }
  return res.render('user_edit', { user });
});

router.post('/:id', async (req, res) => {
  console.log('Atualizaçao de usuario', req.body);
  const id = req.params.id;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }
  _.assign(user, req.body);

  await user.save();
  res.redirect('/users');
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  await user.destroy();
  res.send('Usuário excluído');
});

//-----------------------------------------------------------

module.exports = router;
