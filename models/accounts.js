//1st step

const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const AccountsModel = sequelize.define("accounts", 
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(255)
    },
    contacts: {
        type: DataTypes.STRING(11)
    }
}, 
{
    timestamps: false
})

module.exports = AccountsModel