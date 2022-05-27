//to run the server with nodemon use npm run devStart
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");
const PostRouter = require("./routes/post");
//making the connection with moongose database (mongodb: loclahost/ databasename)
mongoose.connect("mongodb://localhost/Instagram");
//mongoose.connect("process.env.DATABASE_URL")
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database is connected"));

//middleware : function run between userrequest and sending the data to the user
app.use(express.urlencoded({ extended: false }));
//It help in reading form data in json.

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRouter);

app.listen("3100", () => {
  console.log("Server is running");
});

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

//https://www.postman.com/downloads/

//https://www.npmjs.com/package/bcrypt
