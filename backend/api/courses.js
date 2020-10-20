import express from "express";
import db from "../db/database";
import Course from "../domain/course";

const router = express.Router();

// get -> /institution
router.get("/", (req, res, next) => {
  db.query(Course.getAllCoursesSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "Courses listed.",
        data: data
      });
    }
  });
});

//get -> /institution/:id
router.get("/:id", (req, res, next) => {
  let id = req.params.id;

  db.query(Course.getCourseByIdSQL(id), (err, data) => {
    if (!err) {
      if (data && data.length > 0) {
        res.status(200).json({
          message: "Course found.",
          data: data
        });
      } else {
        res.status(200).json({
          message: "Course Not found."
        });
      }
    }
  });
});

// post -> /institution
router.post("/", (req, res, next) => {
  //read Institution information from request
  let course = new Course(req.body.name);

  db.query(course.getAddCourseSQL(), (err, data) => {
    res.status(200).json({
      message: "Course added.",
      data: data
    });
  });
});

//put -> /institution/:id
router.put("/:id", (req, res, next) => {
  let course = {
    id: req.params.id,
    name: req.body.name
  };

  db.query(Course.updateCourseByIdSQL(course.id, course.name), (err, data) => {
    if (!err) {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: "Curso atualizada com sucesso",
          data: data
        });
      } else {
        res.status(200).json({
          message: "Não foi possível atualizar o curso"
        });
      }
    }
  });
});

// delete -> /institution/:id
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;

  db.query(Course.deleteCourseByIdSQL(id), (err, data) => {
    if (!err) {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: `Instituição deletada com sucesso!${err}`,
          data: data
        });
      } else {
        res.status(200).json({
          message: "Não foi possivel deletar essa instituição!",
          data: data
        });
      }
    }
  });
});

module.exports = router;
