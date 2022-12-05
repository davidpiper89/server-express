const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  const { email, password } = req.body;

  const indexOf = req.users.findIndex(
    (user) => user.email === email && user.password === password
  );

  if (indexOf === -1) {
    res.send({ status: 0, error: "incorrect details" });

    return;
  }
  const token = Math.round(Math.random() * 10000000);
  req.users[indexOf].token = token;
  res.send({ status: 1, token });
});

module.exports = app;
