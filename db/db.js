const Sequelize = require('sequelize')

const db = new Sequelize('wallet', 'root', 'lbatatam23@', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db