const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const db =
  "mongodb+srv://matias:matias@cluster0.yj0z7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err: any) => console.log(err));
