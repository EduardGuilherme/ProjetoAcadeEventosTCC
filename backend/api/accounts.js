import express from "express";
import db from "../db/database";
import jwt from "jsonwebtoken";
import Account from "../domain/account";

const JWT_PASSWORD = "dracaris";
const router = express.Router();

//rota de login para retorno do token de autenticação
router.post("/", (req, res, next) => {
  let email = req.body.email;
  let user = {};
  db.query(Account.getAccountByEmail(email), (err, data) => {
    if (!err) {
      if (data.length > 0) {
        let db_email = data[0].email;
        let db_password = data[0].password;

        if (db_email !== req.body.email && db_password !== req.body.password) {
          res
            .status(200)
            .json({ message: "Usuário ou senha inválidos", code: 401 });
        } else {
          res.status(200).json({
            message: "login com sucesso!",
            token: jwt.sign({ email: req.body.email }, JWT_PASSWORD),
            code: 200,
            account: data
          });
        }
      } else {
        res.status(200).json({
          message: "Email ou senhão não localizado em nosso sistema;",
          code: 401
        });
      }
    }
  });
  // if (
  //   !user[req.body.username] ||
  //   user[req.body.username] !== req.body.password
  // ) {
  //   res.status(401).json({ message: "Usuário ou senha inválidos" });
  // } else {
  //   res.status(200).json({
  //     message: "login com sucesso!",
  //     token: jwt.sign({ username: req.body.username }, JWT_PASSWORD)
  //   });
  // }
});

router.post("/create", (req, res, next) => {
  let account = new Account(req.body.email, req.body.password);
  console.log(account);
  db.query(account.addAccount(), (err, data) => {
    if (err) {
      res.status(200).json({
        message: "Não foi possível criar sua conta. ",
        err: err
      });
    } else {
      res.status(200).json({
        message: "Seja bem vindo a Acadeventos, ! Seu cadastro foi realizado.",
        data: data
      });
    }
  });
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let account = new Account(
    req.body.email,
    req.body.password,
  );
  db.query(account.updateAccount(id), (err, data) => {
    if (!err) {
      if (data && data.affectedRows >= 1) {
        res.status(200).json({
          message: "Conta atualizada com sucesso",
          data: data
        })
      } else {
        res.status(402).json({
          message: "Houve algum erro no sistema",
          err: err
        })
      }

    } else {
      res.status(402).json({
        message: "Não foi possível inserir a conta no nosso banco.",
        err: err
      })
    }
  })
})

module.exports = router;
