const express = require("express");
const app = express();
const cors = require("cors");
const connexion = require("./controllers/db").connexion;
app.use(cors()); // allow request from different domains
app.use(express.json()); // create an express application

connexion.connect((err) => {
  // establish connection with database
  if (err) {
    console.error("error", err);
    return;
  }
  console.log("Connected to database");
});
require("./routes/auth.route")(app);
// Import and set up the user routes
const saveUser = require("./controllers/user.controller");
saveUser(app);

const saveNote = require("./controllers/note.controller");
saveNote(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
