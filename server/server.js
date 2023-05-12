require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const Schedular = require("./routes/ShedularEmailCheck");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.resolve(__dirname, "/public")));

Schedular.handleShedular.start();

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/password-reset", require("./routes/reset"));
app.use("/upload", require("./routes/uploadexcel"));
app.use("/api", require("./routes/list"));
app.use("/mail", require("./routes/sendAlert"));
app.use("/updateData", require("./routes/updatedData"));
app.use("/receive", require("./routes/receiveEmail"));
app.use("/verify", require("./routes/verifyStatus.js"));
app.use("/adminverify", require("./routes/adminverify.js"));
app.use("/delete", require("./routes/delete"));
app.use("/listforadmin", require("./routes/listForAdmin"));
app.use("/userinfo", require("./routes/userDetalis"));
app.use("/globalinfo", require("./routes/GlobalInfo"));
app.use("/viewrecord", require("./routes/ViewAllData"));
app.use("/deleteall", require("./routes/deleteAll"));
app.use("/updateall", require("./routes/updateAll"));
app.use("/adminlogin", require("./routes/AdminLogin"));
app.use("/unverify", require("./routes/unverifyStatus.js"));
app.use("/adminunverify", require("./routes/adminunverifyStatus.js"));
app.use("/adminverify", require("./routes/adminverifyStatus.js"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
