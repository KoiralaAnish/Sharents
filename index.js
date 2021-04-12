const express = require("express");

const app = express();

const dotenv = require("dotenv");
dotenv.config();
const studentsRouter = require("./api/students/students.router");
const buySell = require("./api/b&s/buySell-router");
app.use(express.json());

app.use("/api/students", studentsRouter);
app.use("/api/students", buySell);

app.listen(5000, () => console.log("Server is started at port : 5000"));
