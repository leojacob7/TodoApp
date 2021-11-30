const sql = require('mysql2');

module.exports = sql.createConnection({
	host: 'localhost',
	user: 'root',
	// password: 'user',
	database: 'test',
});
