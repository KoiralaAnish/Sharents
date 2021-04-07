const { genSaltSync, hashSync } = require("bcryptjs");
var bcrypt = require("bcryptjs");

const { sign } = require("jsonwebtoken");
const pool = require("../../database/database-config");

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		let sql = `select * from user_info where username = ?`;

		pool.query(sql, [body.username], (error, results) => {
			if (error) {
				throw error;
			}
			if (results.length > 0) {
				res.status(400).json({
					message: "Username already exists Please Try Unique",
				});
			} else {
				var sql = `insert into user_info(first_name,last_name,username,email,password,faculty,batch,roll_no,college)
			 values(?,?,?,?,?,?,?,?,?)`;
				pool.query(
					sql,
					[
						body.first_name,
						body.last_name,
						body.username,
						body.email,
						body.password,
						body.faculty,
						body.batch,
						body.roll_no,
						body.college,
					],
					(err, results) => {
						if (err) {
							res.status(400).json({
								message: "Error in students Registration",
							});
						} else {
							res.status(200).json({
								message: "User Registered Successfully",
								data: results,
							});
						}
					}
				);
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

			const comparision = bcrypt.compareSync(password, results[0].password);
			if (comparision) {
				const jsontoken = sign({ result: results }, process.env.TOKEN, {
					expiresIn: "1h",
				});
				res.json({ message: "Login successful", token: jsontoken });
			} else {
				res.json({ message: "Username or password didn't matched" });
			}
		});
	},
};
