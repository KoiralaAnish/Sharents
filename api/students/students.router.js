const { createUser, userLogin } = require("./students.controller");
const router = require("express").Router();
const authenticateToken = require("../../auth/auth");

router.post("/registration", authenticateToken, createUser);
router.post("/login", userLogin);

module.exports = router;
