var express = require('express');
var router = express.Router();

const productsController = require("../controllers/productsController")

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prueba Express' });
});*/
router.get("/", productsController.getStarred);


module.exports = router;
