const express = require("express");
const router = express.Router();
const User = require("../db/User.db");

const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  const { email, name, password } = req.body;

  const salt = 10;

  const hash = bcrypt.hashSync(password, salt);

  User.create({
    email: email,
    name: name,
    password: hash,
  })
    .then(() => {
      res.status(201).send("ok");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Um Erro Ocorreu");
    });
});

/* router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.send(users)
    })
})*/

/* router.post('/remove', (req, res) => {
    User.destroy({
        where: {
            id: 7
        }
    }).then(() => {
        res.send('OK')
    })
}) */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  try{
    if (user) {
      const correct = await bcrypt.compareSync(password, user.password);
  
      if (correct) {
        req.session.authUser = {
          id: user.id,
          email: user.email,
        };
        res.send("Ok");
      } else {
        res.send("Senha incorreta");
      }
    } else {
      res.send("Usuário não encontrado");
    }
  }catch(err){
    console.log(err)
  }
});

module.exports = router;

// Falta fazer a parte de redirecionamento
