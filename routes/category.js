var express = require('express');
var router = express.Router();

const categoryController = require("../controllers/categoryController")

    router.get("/", categoryController.getCategory);
    router.post("/", categoryController.create)

module.exports = router;