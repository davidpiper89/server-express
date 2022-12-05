const express = require("express");
const app = express.Router();

// app.post("/", (req, res) => {
//   req.state.push(req.body);
//   res.send("created rocket");
//   console.log(req.headers.name);
// });

// app.get("/", (req, res) => {
//   res.send(req.state);
// });

app.get("/account", (req, res) => {
  res.redirect("/");
});

app.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0 });
    return;
  }

  const indexOf = req.users.findIndex((user) => user.email === email);
  if (indexOf >= 0) {
    res.send({ status: 0, error: "Existing account" });
    return;
  }
  req.users.push({ email, password });
  res.send({ status: 1 });
});



// app
//   .route("/:id")
//   .get((req, res) => {
//     res.send(
//       `Get single rocket with ID : ${req.params.id}, ${
//         req.state[req.params.id]
//       }`
//     );
//   })
//   .put((req, res) => {
//     const updatedRocket = req.params.id;
//     const indexOf = req.state.findIndex(
//       (mission) => mission.id === Number(updatedRocket)
//     );
//     req.state[indexOf] = req.body;
//     res.send(`updated rocket with ID: ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     const deletedRocket = req.params.id;
//     const indexOf = req.state.findIndex(
//       (mission) => mission.id === Number(deletedRocket)
//     );

//     req.state.splice(indexOf, 1);
//     res.send(`deleted rocket with ID : ${req.params.id}`);
//     console.log(req.state);
//   });

module.exports = app;
