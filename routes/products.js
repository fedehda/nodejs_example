var express = require('express');
var router = express.Router();

const productsController = require("../controllers/productsController")

/* GET products listing. */
router.get('/', productsController.getAll);

router.get("/paginate", productsController.getPaginate);

router.get('/:id', productsController.getByID);

router.get("/starred", productsController.getStarred);

router.post('/',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.create)

//router.put('/:id',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.update)
router.put('/:id', productsController.update)

router.delete('/:id',(req,res,next)=>req.app.verifyToken(req,res,next), productsController.delete)

module.exports = router;
