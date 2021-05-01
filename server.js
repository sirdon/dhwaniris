const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const formData = require("express-form-data");
const os = require("os");
dotenv.config();
const app = express();
const { authMiddleware } = require("./controller/auth");

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// connect to mongoDB

mongoose
  .connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log({ err }));

// import routes
const register = require("./routes/reg");
const UserRoutes = require("./routes/user");
const StateDisRoutes = require("./routes/state_dis");
const ChildRoutes = require("./routes/child");
// middleware
app.use("/api", register);
app.use("/api/user", UserRoutes);
app.use("/api", authMiddleware, StateDisRoutes);
app.use("/api", authMiddleware, ChildRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
