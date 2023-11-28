const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")


const AdminModel = sequelize.define("admin_accounts",
{
    Id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(255)
    }
    
})

module.exports = AdminModel