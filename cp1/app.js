(function () {
  'use strict';

  var mongodb = require('mongodb');
  var express = require('express');
  var consolidate = require('consolidate');

  var app = express();

  app.engine('html', consolidate.nunjucks);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/movies/');

  mongodb.MongoClient.connect('mongodb://localhost/movies', function (err, db) {
    app.use('/', require('./movies')(db));

    var server = app.listen(8081, function () {
      console.log('Server listening on port', server.address().port);
    });
  });

})();