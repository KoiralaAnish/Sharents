const { verify } = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	let token = req.get("authorization");
	if (token) {
		token = token.slice(7);
		verify(token, process.env.TOKEN, (err, decoded) => {
			if (err) {
				res.json({
					message: "invalid token",
				});
			} else {
				next();
			}
		});
	} else {
		res.json({
			message: "access denied! unauthorized user",
		});
	}
}
module.exports = authenticateToken;
