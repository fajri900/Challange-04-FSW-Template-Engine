const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");

const carsRoutes = require("./routes/carsRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(`${__dirname}/public`));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use("/", carsRoutes);

module.exports = app;
