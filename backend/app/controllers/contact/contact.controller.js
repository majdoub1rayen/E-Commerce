const cors = require("cors");
const connexion = require("../db").connexion;

const saveContact = (app) => {
  app.use(cors());

  app.post("/contact", (req, res) => {
    const contactData = req.body;

    const insertQuery =
      "INSERT INTO contact (name, email, message, subject) VALUES (?, ?, ?, ?)";

    const values = [
      contactData.name,
      contactData.email,
      contactData.message,
      contactData.subject,
    ];

    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error saving contact:", err);
        res.status(500).json({ message: "Error saving contact" });
        return;
      }

      console.log("Contact saved successfully!");
      res.status(200).json({ message: "Contact saved successfully" });
    });
  });
};

module.exports = saveContact;
