import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import institutions from "./api/institutions";
import courses from "./api/courses";
import accounts from "./api/accounts";
import students from "./api/students";
import events from "./api/events";
import favorites from "./api/favorites";

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/institutions", institutions);
app.use("/courses", courses);
app.use("/accounts", accounts);
app.use("/students", students);
app.use("/events", events);
app.use("/favorites", favorites);

//caso a requisição dê erro, ela cairá aqui
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//todas as outras requisições não estão implementadas
app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

module.exports = app;
