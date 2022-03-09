const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const passport = require("passport");
const MongoStore = require("connect-mongo");
const { ensureAuth, ensureGuest } = require("./middleware/auth");

const path = require("path");
// const envPath = path.join(
//     __dirname,
//     process.env.NODE_ENV === "development" ? "/dev.env" : "/.env"
// );

require("dotenv").config({ path: "./dev.env" });
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const record = require("./routes/record");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

require("./config/passport")(passport);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));

app.use("/api/record", record);
app.use("/", (req, res) => {
    res.send("heelo");
});
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on Port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
