import express from "express";
import db from "../db/database";
import Institution from "../domain/Institution";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = "dracaris";

const router = express.Router();

// get -> /institution
router.get("/", (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Faltou JWT de sessão"
    });
  } else {
    auth = auth
      .split("Bearer")
      .pop()
      .trim();
  }

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: "Sessão inválida"
      });
    }
    db.query(Institution.getAllInstitutionsSQL(), (err, data) => {
      if (!err) {
        res.status(200).json({
          message: "Institutions listed.",
          data: data
        });
      }
    });
  });
});
//get -> /institution/:id
router.get("/:id", (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Faltou JWT de sessão"
    });
  } else {
    auth = auth
      .split("Bearer")
      .pop()
      .trim();
  }

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: "Sessão inválida"
      });
    }

    let pid = req.params.id;
    db.query(Institution.getInstitutionByIdSQL(pid), (err, data) => {
      if (!err) {
        if (data && data.length > 0) {
          res.status(200).json({
            message: "Institution found.",
            data: data
          });
        } else {
          res.status(200).json({
            message: "Institution Not found."
          });
        }
      }
    });
  });
});
// post -> /institution
router.post("/", (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Faltou JWT de sessão"
    });
  } else {
    auth = auth
      .split("Bearer")
      .pop()
      .trim();
  }

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: "Sessão inválida"
      });
    }
    //read Institution information from request
    let institution = new Institution(
      req.body.name,
      req.body.cep,
      req.body.number
    );

    db.query(institution.getAddInstitutionSQL(), (err, data) => {
      res.status(200).json({
        message: "Institution added.",
        data: data
      });
    });
  });
});
//put -> /institution/:id
router.put("/:id", (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Faltou JWT de sessão"
    });
  } else {
    auth = auth
      .split("Bearer")
      .pop()
      .trim();
  }

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: "Sessão inválida"
      });
    }
    let institution = {
      id: req.params.id,
      name: req.body.name,
      cep: req.body.cep,
      number: req.body.number
    };

    db.query(
      Institution.updateInstitutionByIdSQL(
        institution.id,
        institution.name,
        institution.cep,
        institution.number
      ),
      (err, data) => {
        if (!err) {
          if (data && data.affectedRows > 0) {
            res.status(200).json({
              message: "Instituição atualizada com sucesso",
              data: data
            });
          } else {
            res.status(200).json({
              message: "Não foi possível atualizar a instituição"
            });
          }
        }
      }
    );
  });
});
// delete -> /institution/:id
router.delete("/:id", (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Faltou JWT de sessão"
    });
  } else {
    auth = auth
      .split("Bearer")
      .pop()
      .trim();
  }

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: "Sessão inválida"
      });
    }
    let id = req.params.id;

    db.query(Institution.deleteInstitutionByIdSQL(id), (err, data) => {
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
});

module.exports = router;
