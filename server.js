const express = require("express");
const path = require("path");
const envPath = path.join(
  __dirname,
  process.env.NODE_ENV === "development" ? "/dev.env" : "/.env"
);
require("dotenv").config({ path: envPath });
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

app.use("/api/record", record);

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
