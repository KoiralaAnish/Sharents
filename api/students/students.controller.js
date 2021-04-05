const { genSaltSync, hashSync } = require("bcryptjs");
var bcrypt = require("bcryptjs");
const { create } = require("./students.service");
const { sign } = require("jsonwebtoken");
const pool = require("../../database/database-config");

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		create(body, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: 0,
				});
			} else {
				return res.status(200).json({
					success: 1,
					data: results,
				});
			}
		});
	},
	userLogin: (req, res) => {
		var username = req.body.username;

		var password = req.body.password;

		var sql = `select * from user_info where username =?`;

		pool.query(sql, [username], (err, results, fields) => {
			if (err) {
				throw err;
			}
			console.log(results[0]);
			const comparision = bcrypt.compareSync(password, results[0].password);
			if (comparision) {
				const jsontoken = sign({ result: results }, process.env.TOKEN, {
					expiresIn: "1h",
				});
				res.json({ message: "Login successful", token: jsontoken });
			} else {
				res.json({ message: "Login Unsuccessful" });
			}
		});
	},
};
