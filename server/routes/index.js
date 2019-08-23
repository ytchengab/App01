var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/1', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/1234', function(req, res, next) {
  res.render('index', { title: 'Express1234' });
});

module.exports = router;
