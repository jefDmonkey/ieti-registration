const { Sequelize } = require("sequelize")
const chalk = require("chalk")

const sequelize = new Sequelize('ieti_registration', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: "mysql",
    freezeTableName: true
});

async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log(chalk.yellow('Connection has been established successfully.'));
        return await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectToDB };