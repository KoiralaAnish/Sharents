const { createPool } = require("mysql");
const db = createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "sharents",
});

module.exports = db;
