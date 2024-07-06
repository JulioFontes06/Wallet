const express = require("express");
const session = require("express-session")
const app = express();

const routersUser = require("./controllers/users.controller");
const routersData = require("./controllers/datas.controller");
const routerScreen = require("./controllers/screen.controller");

app.use(express.json())

const db = require("./db/db");

app.use(
  session({
    secret: "$2a$12$JKl6ScpnDkaXTYO1bMe54.q3Ct0XatGXtUEoVWw.H1yv1iyUkaouy",
    cookie: { maxAge: 86400000 },
    resave: false,
    saveUninitialized: true
  })
);

app.use("/", routersUser);
app.use("/", routersData);
app.use("/", routerScreen);


app.get("/", (req, res) => {
  res.send("Main scren");
});

db.authenticate()
  .then(() => console.log("> Database started"))
  .catch((err) => console.log(err));

app.listen(3000, console.log("> Started"));
