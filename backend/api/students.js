import express from "express";
import db from "../db/database";
import Student from "../domain/student";

const router = express.Router();

/** /students */
router.get("/", (req, res, next) => {
  db.query(Student.getAllStudents(), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Não foi possivel retornar os estudantes",
        err: err
      });
    } else {
      res.status(200).json({
        message: "Listando estudantes",
        data: data
      });
    }
  });
});

/** /students */
router.get("/account/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(Student.getStudentByUserId(id), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Não foi possivel retornar os estudantes",
        err: err
      });
    } else {
      res.status(200).json({
        message: "Listando estudantes",
        data: data
      });
    }
  });
});

/** /students/:id */
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(Student.getStudentById(id), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Ocorreu algum erro no nosso sistema",
        err: err
      });
    } else {
      if (data && data.length > 0) {
        res.status(200).json({
          message: "Usuário localizado em nosso sistema",
          data: data
        });
      } else {
        res.status(200).json({
          message: "Usuário não localizado no nosso sistema"
        });
      }
    }
  });
});
/** /students */
router.post("/", (req, res, next) => {
  let student = new Student(
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.id_account,
    req.body.id_course,
    req.body.id_institution
  );

  db.query(student.addStudent(), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Ocorreu algum erro no nosso sistema",
        err: err
      });
    } else {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: "Estudante adicionado com sucesso",
          data: data
        });
      } else {
        res.status(200).json({
          message:
            "Não foi possível adicionar esse estudante. Entre em contato com o nosso suporte: thiagooliveirasilva1509@gmail.com"
        });
      }
    }
  });
});
/** /students/:id */
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let student = new Student(
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.id_account,
    req.body.id_course,
    req.body.id_institution
  );

  db.query(student.updateStudentById(id), (err, data) => {
    if (!err) {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: "Estudante alterado com sucesso",
          data: data
        });
      } else {
        res.status(200).json({
          message:
            "Não foi possível alterar os dados esse estudante. Entre em contato com o nosso suporte: thiagooliveirasilva1509@gmail.com"
        });
      }

    } else {
      res.status(200).json({
        message: "Ocorreu algum erro no nosso sistema",
        err: err
      });
    }
  });
});
/** /students/id */
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(Student.removeStudentById(id), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Ocorreu algum erro no nosso sistema",
        err: err
      });
    } else {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          message: "Estudante removido com sucesso",
          data: data
        });
      } else {
        res.status(200).json({
          message:
            "Não foi possível remover esse estudante. Entre em contato com o nosso suporte: thiagooliveirasilva1509@gmail.com"
        });
      }
    }
  });
});

module.exports = router;
