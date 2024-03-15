const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const e = require("express");
const employeemodel = require("./employee");
// const app
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/Login_authorization", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  employeemodel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("Create a new user");
      }
    })
    .catch((error) => {
      console.error("Error in login:", error);
      res.status(500).json("An error occurred while logging in");
    });
});


app.post("/register", (req, res) => {
  employeemodel
    .create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
