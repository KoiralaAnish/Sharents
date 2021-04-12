const db = require("../../database/database-config");

module.exports = {
	postItems: (req, res) => {
		const body = req.body;
		var sql = `insert into buyandsell(item_name,item_price,item_desc,posted_date) values (?,?,?,?)`;

		db.query(
			sql,
			[body.item_name, body.item_price, body.item_desc, body.posted_date],
			(error, results) => {
				if (error) {
					console.log("Error While inserting buyandsell data");
				}
				res.status(200).json({
					message: "items added successfully",
					data: results,
				});
			}
		);
	},
	getItems: (req, res) => {
		const sql = `select * from buyandsell`;
		db.query(sql, (error, results) => {
			if (error) {
				throw error;
			}
			res.status(200).json({
				results,
			});
		});
	},
};
