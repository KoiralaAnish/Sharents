const { createPool } = require("mysql");
const pool = createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "sharents",
});

module.exports = pool;
