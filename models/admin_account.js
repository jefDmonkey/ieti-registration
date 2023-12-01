const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const AdminAccountModel = sequelize.define("admin_account", {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    pass: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = AdminAccountModel