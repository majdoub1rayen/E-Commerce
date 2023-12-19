const express = require("express");
const app = express();
const cors = require("cors");
const connexion = require("./app/controllers/db").connexion;
app.use(cors());
app.use(express.json());

connexion.connect((err) => {
  if (err) {
    console.error("error", err);
    return;
  }
  console.log("Connected to database");
});

const saveContact = require("./app/controllers/contact/contact.controller");
saveContact(app);

const saveUser = require("./app/controllers/user/user.controller");
saveUser(app); // Include the user routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
