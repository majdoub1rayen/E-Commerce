const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
const router = express.Router();

const saveUser = (app) => {
  app.use(cors());

  // Login Endpoint
  app.post("/login", async (req, res) => {
    const userData = req.body;
    const { email, password } = userData;

    try {
      const userQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
      const user = await queryDatabase(userQuery, [email, password]);

      if (user.length > 0) {
        console.log("User login successful!");
        return res.status(200).json({ message: "User login successful" });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error during login" });
    }
  });

  // Registration Endpoint
  app.post("/register", async (req, res) => {
    const userData = req.body;
    const { email, password, First_Name, Last_Name } = userData;

    try {
      const userExistsQuery = "SELECT * FROM user WHERE email = ?";
      const userExists = await queryDatabase(userExistsQuery, [email]);

      if (userExists.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const insertUserQuery =
        "INSERT INTO user (First_Name, Last_Name, email, password) VALUES (?, ?, ?, ?)";
      await queryDatabase(insertUserQuery, [
        First_Name,
        Last_Name,
        email,
        password,
      ]);

      console.log("User registered successfully!");
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Error registering user" });
    }
  });

  // Function to query the database
  const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
      connexion.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
};

module.exports = saveUser;
