const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const session = require('express-session');
const hbs = require('hbs');

//----------------------------------------------------------
// Resgata arquivo de rota

const AuthRoute = require('./routes/auth.route');
const IndexRoute = require('./routes/index.route');
const MakerRoutes = require('./routes/maker.route');
const ProjectRoutes = require('./routes/project.route');

//----------------------------------------------------------

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//----------------------------------------------------------
// Express Session

// Configura express-session
var expiraCookie = new Date(Date.now() + 60 * 60 * 1000);
app.use(session({
  secret: 'senha',
  name: 'roamming_discard',
  cookie: {
    secure: false,
    expires: expiraCookie
  }
}));
// Adiciona sessão em toda resposta do servidor
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

//----------------------------------------------------------
//Registra Helpers //TO_DO MUDAR DE LUGAR

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
app.use('/makers', MakerRoutes);
app.use('/projects', ProjectRoutes);

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
