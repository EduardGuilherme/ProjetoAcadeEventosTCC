import express from "express";
import db from "../db/database";
import Event from "../domain/event";

const router = express.Router();

/** /events */
router.get("/", (req, res, next) => {
  db.query(Event.getAllEvents(), (err, data) => {
    if (!err) {
      res.status(200).json({
        data: data
      });
    } else {
      res.status(200).json({
        err: err
      });
    }
  });
});
/** /events/:id */
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(Event.getEventById(id), (err, data) => {
    if (!err) {
      if (data && data.length > 0) {
        res.status(200).json({
          data: data
        });
      } else {
        res.status(200).json({
          message: "não foi possível localizar o evento"
        });
      }
    }
  });
});

router.get("/status/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(Event.getEventByStatus(id), (err, data) => {
    if (!err) {
      if (data && data.length > 0) {
        res.status(200).json({
          data: data
        });
      } else {
        res.status(200).json({
          message: "não foi possível localizar o evento"
        });
      }
    }
  });
})

/** /events */
router.post("/", (req, res, next) => {
  let event = new Event(
    req.body.name,
    req.body.image,
    req.body.start_date,
    req.body.final_date,
    req.body.start_time,
    req.body.status_event,
    req.body.description,
    req.body.id_institution,
    req.body.id_student
  );

  console.log(event);

  db.query(event.addEvent(), (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "Evento adicionado com sucesso!",
        data: data
      });
    } else {
      res.status(200).json({
        message: "Erro ao inserir o evento.",
        data: err
      });
    }
  });
});

router.put("/status/:id", (req, res, next) => {
  let id = req.params.id;
  let status_event = req.body.status_event;
  db.query(Event.updateStatusEvent(id, status_event), (err, data) => {
    if (!err) {
      res.status(200).json({
        data: data
      });
    }
  })
})

module.exports = router;
