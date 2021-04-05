const express = require("express");
const mysql = require("mysql");

const app = express();

const dotenv = require("dotenv");
dotenv.config();
const studentsRouter = require("./api/students/students.router");
app.use(express.json());

app.use("/api/students", studentsRouter);

app.listen(5000, () => console.log("Server is started at port : 5000"));
