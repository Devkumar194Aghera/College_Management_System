const mysql = require("mysql2");
const {
  DB_PASS,
  DB_HOST,
  DB_USER,
  DB_PORT,
} = require("../config/serverConfig");

const makeConnection = () => {
  try {
    const connection = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT,
      database: "college_management_db",
      waitForConnections: true,
    });
    console.log("connected");
    return connection.promise(); // Convert the pool to promise-based
  } catch (error) {
    console.log("Error while connecting to DB");
    throw error;
  }
};

module.exports = makeConnection;
