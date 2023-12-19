const connexion = require("../db").connexion;
const jwt = require("jsonwebtoken");
var util = require("util");

const secretKey = "issatm123";

const login = (req, res) => {
  const { email, password } = req.body;

  connexion.query(
    "SELECT * FROM user WHERE email = ?",
    email,
    (err, results) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Failed to log in" });
      } else if (results.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        const user = results[0];

        if (password !== user.password) {
          res.status(401).json({ error: "Invalid email or password" });
        } else {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            {
              expiresIn: "1h",
            }
          );

          res.json({ token });
        }
      }
    }
  );
};

module.exports = {
  login,
};
