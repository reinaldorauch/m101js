(function () {
  'use strict';

  var express = require('express');
  var movieRouter = express.Router();
  var bodyParser = require('body-parser');

  movieRouter.use(bodyParser.urlencoded());

  function homeGet (db, req, res, cb) {
    db.collection('movies')
      .find({})
      .toArray(function (err, movies) {
        res.render('index', { movies: movies });
      });
  }

  function homePost (db, req, res, cb) {
    db.collection('movies')
      .insert(req.body, { writeConcern: 1 }, function () {
        res.redirect('/');
      });
  }

  module.exports = function (db) {
    movieRouter.get('/', homeGet.bind(null, db));
    movieRouter.post('/', homePost.bind(null, db));
    return movieRouter;
  };
})();