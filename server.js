const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const spaceX = require("./spaceX.json");

const state = [...spaceX];
state.forEach((mission, index) => {
  mission.id = index + 1;
});

app.use(bodyParser.json());

const users = [];

app.use((req, res, next) => {
  req.users = users;
  next();
});

app.use(function (req, res, next) {
  req.state = state;
  next();
});

const auth = (req, res, next) => {
  const indexOf = users.findIndex((user) => {
    return user.token === Number(req.headers.token);
  });
  if (indexOf === -1) {
    res.send({ status: 0, error: "The Token was not found" });
    return;
  }
  next();
};

app.use("/", require("./routes/rockets"));
app.use("/get", auth, require("./routes/get"));
app.use("/login", require("./routes/login"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log("Server started on port:" + port);
});
