const pool = require("../../database/database-config");

module.exports = {
	create: (data, callback) => {
		pool.query(
			`insert into user_info(first_name,last_name,username,email,password,faculty,batch,roll_no,college)
			 values(?,?,?,?,?,?,?,?,?)`,
			[
				data.first_name,
				data.last_name,
				data.username,
				data.email,
				data.password,
				data.faculty,
				data.batch,
				data.roll_no,
				data.college,
			],
			(error, results) => {
				if (error) {
					return callback(error);
				}
				return callback(null, results);
			}
		);
	},
};
