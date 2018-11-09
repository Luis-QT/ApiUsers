const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b137029b7d5dae',
  password: 'c5288162',
  database: 'heroku_9ff696578d5487d',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
