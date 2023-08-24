const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('ieti_registration', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: "mysql"
});

async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectToDB };