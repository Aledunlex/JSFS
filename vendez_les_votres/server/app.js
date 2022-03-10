const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ???
app.use(logger('dev'));

// deux middlewares qui analysent la requête
// si la requete contient des données json ou urlencoded, elles sont ajoutées
// à req.body, le champ "body" de la requête traitée
// note : Il est possible d'indiquer à Express plusieurs
// dossiers pouvant contenir des ressources statiques
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// analyse requête et extrait de son entêtes les cookies si existants
// ajoute alors à req.cookies les données
app.use(cookieParser());

// répondre à une requête qui concerne une ressource
// présente dans le chemin indiqué, ici public
// accédés SANS mettre '/public' dans l'@
app.use(express.static(path.join(__dirname, 'public')));

// déclaration des routes possibles
app.use('/', indexRouter);
app.use('/users', usersRouter);

// on ajoutera ici (avant la gestion d'erreur) les 
// middleware avec routers nécessaires, si besoin

// catch 404 and forward to error handler
// donc à garder après toutes les routeroutes possibles '/...'
app.use( (req, res, next) => next(createError(404)) );

// error handler, se fait "passer le flambeau" par l'appel à next() du app.use précédent
// donc le middleware qui génère une erreur 404
// * req est l’objet de la requête HTTP, type Request, reçue par le serveur
// * res est l’objet de la réponse HTTP, type Response, correspond à la réponse au client
// * next est une fonction callback utilisée pour chainer les middlewares
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); //appelé par next(createError(404)) au dessus
});

module.exports = app;
