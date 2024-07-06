const express = require("express");
const router = express.Router();
const User = require("../db/User.db");
const Data = require("../db/data.db");

const Auth = require("../middleware/Auth.middleware");

const moment = require("moment");

router.get("/datas/:userId", Auth, (req, res) => {
  const { userId } = req.params;

  if (userId) {
    Data.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: User,
        },
      ],
    }).then((users) => {
      if (users.length > 0) {
        const formattedUser = users.map((user) => ({
          value: user.value,
          name: user.user.name,
          date: moment(user.createdAt).format("DD/MM/YY"),
        }));
        res.send(formattedUser);
      }
    });
  }else{
    res.send("Usuário não encontrado")
  }
});

module.exports = router;
