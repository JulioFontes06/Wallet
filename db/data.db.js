const Sequelize = require('sequelize')
const db = require('./db')

const UserDb = require('./User.db')

const data = db.define('datas', {
    value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


UserDb.hasMany(data)
data.belongsTo(UserDb)

//data.sync({force: true})
module.exports = data