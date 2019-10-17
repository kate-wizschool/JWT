var express = require("express");
var router = express.Router();
let user = require("../db");
let jwt = require("jsonwebtoken");
let secretObj = require("../jwt");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.post("/login", function(req, res, next) {
  // default : HMAC SHA256
  let token = jwt.sign(
    {
      id: req.body.id // 토큰의 내용(payload)
    },
    secretObj.secret, // 비밀 키
    {
      expiresIn: "5m"
    }
  );

  user.map(page => {
    if (page.id === req.body.id) {
      if (page.password === req.body.password) {
        res.cookie("user", token);
      }
    }
  });

  res.render("login");
});

router.get("/info", function(req, res, next) {
  let token = req.cookies.user;
  let decoded = jwt.verify(token, secretObj.secret);
  let gender = "";
  if (decoded) {
    user.map(page => {
      if (page.id === decoded.id) {
        gender = page.gender;
      }
    });
    console.log(gender);
    res.render("info", { title: gender });
  } else {
    res.send("권한이 없습니다.");
  }
});

module.exports = router;
