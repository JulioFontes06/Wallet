const express = require("express");
const router = express.Router();
const User = require("../db/User.db");
const Data = require("../db/data.db");

const Auth = require("../middleware/Auth.middleware");

router.post("/addData", Auth, (req, res) => {
  const { type, value, userId } = req.body;
      Data.create({
        type: type,
        value: value,
        userId: userId,
      }).then(() => {
        res.send("Registro cadastrado");
      }).catch(err => {
        console.log(err)
      });
});

router.post("/excludeData", Auth, (req, res) => {
  const { userId, dataId } = req.body;

  if (dataId) {
    if (!isNaN(dataId)) {
      Data.destroy({
        where: { id: dataId },
      });
      if (userId) {
        res.redirect(`/datas/${userId}`);
      } else {
        res.send("Usuário não encontrado");
      }
    } else {
      res.send("Registro não encontrado");
    }
  } else {
    ("Número de registro inválido");
  }
});


router.get('/myDatas', Auth, async (req, res) => {
  const id = req.session.authUser.id;


  const user = await Data.findOne({where: {userId: id}})
  if(user){
    const datas = await Data.findAll()
    res.json(datas)
  }else{
    res.send('Usuario não encontrado')
  }

})

module.exports = router;
