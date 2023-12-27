const { default: mongoose } = require("mongoose");
const express = require("express");
const app = require("express")();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");

const corsOptions = {
  origin: ["http://localhost:5173", "https://uner.vercel.app/", "*"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//* this key finally "open  my door" since the whole day i struggled to solve the pb of empty body data. this tell express to parse the text/plain to json
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

//* some options to add for CORES issues
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://uner.vercel.app/", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Add other headers here
  res.setHeader("Access-Control-Allow-Methods", ", GET, POST"); // Add other methods here
  res.send();
});
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/shorturl", require("./routes/url"));

app.use(express.static(path.join(__dirname + "/public/api")));

// connection to databasers
app.listen(port, () => {
  console.log(`server is listening to http://localhost:${port}`);
  console.log("CORS-enabled web server listening");
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("Faile to connect to database", err);
    });
});
