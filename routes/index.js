var express = require("express");
var router = express.Router();
let user = require("../db");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/feature", function(req, res, next) {
  res.render("feature");
});

router.get("/home", function(req, res, next) {
  res.render("home");
});

router.get("/image", function(req, res, next) {
  res.render("image");
});
module.exports = router;
