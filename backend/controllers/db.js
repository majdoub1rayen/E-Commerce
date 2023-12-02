const mysql = require("mysql");

const connexion = mysql.createConnection({
  // define database metadata
  host: "localhost",
  user: "root",
  password: "",
  database: "to-do-app",
});

module.exports = {
  connexion,
};
