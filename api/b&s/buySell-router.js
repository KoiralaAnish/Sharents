const router = require("express").Router();
const authenticateToken = require("../../auth/auth");
const { postItems, getItems } = require("../b&s/buySell-controller");

router.post("/buy&sell", authenticateToken, postItems);
router.get("/getitems", authenticateToken, getItems);

module.exports = router;
