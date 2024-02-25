const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_ADMIN_NAME, DB_ADMIN_PASSWORD, DB_CLUSTER_NAME, DB_NAME } =
  process.env;
const DB_HOST = `mongodb+srv://${DB_ADMIN_NAME}:${DB_ADMIN_PASSWORD}@${DB_CLUSTER_NAME}.x2m1vxo.mongodb.net/${DB_NAME}`;

const contactsRouter = require("./routes/api");
const usersRouter = require('./routes/users');

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static('./public/avatars'));

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .then(() =>
    app.listen(3000, () =>
      console.log("Server is running. Use our API on port: 3000")
    )
  )
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
