const Sequelize = require('sequelize')

const sequelize = new Sequelize(
	'webAppDatabase', 
	'root', 
	'theRootPassword', {
		host: 'database',
		dialect: 'mysql',
		operatorsAliases: 'false'
  })

// const Account = sequelize.define('account', {
//     username: sequelize.TEXT,
//     password: sequelize.TEXT
// })
module.exports = sequelize