const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const session = require('express-session');
const hbs = require('hbs');

//----------------------------------------------------------

const AuthRoute = require('./routes/auth.route');
const IndexRoute = require('./routes/index.route');
const UserRoutes = require('./routes/user.route');
const MakerRoutes = require('./routes/maker.route');

//----------------------------------------------------------

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Configura express-session
var expiraCookie = new Date(Date.now() + 60 * 60 * 1000);
app.use(session({
  secret: 'senha',
  name: 'roamming_discard',
  cookie: {
    secure: true,
    expires: expiraCookie
  }
}));

// Adiciona sessão em toda resposta do servidor
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

//----------------------------------------------------------
//Registra os Helpers

hbs.registerHelper('calcula-data', (date) => {
  date = new Date(date);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
});

//----------------------------------------------------------

app.use('/', IndexRoute);
app.use('/auth', AuthRoute);
app.use('/users', UserRoutes);
app.use('/makers', MakerRoutes);

//----------------------------------------------------------
// Configuração da Template Engine

app.set('view engine', 'hbs');
app.set('view options', {
  layout: 'layouts/default'
})

//----------------------------------------------------------

app.listen(3000, () => {
  console.log(`Server rodando! Isso já é ótimo!`);
})
