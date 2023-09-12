const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const RequestModel = sequelize.define("request", 
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.literal("NOW()")
    },
    fullname: {
        type: DataTypes.STRING(255)
    },
    course: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(500)
    },
    contacts: {
        type: DataTypes.STRING(11)
    },
    address: {
        type: DataTypes.STRING(255)
    },
    gender: {
        type: DataTypes.STRING(255)
    },
    user_image: {
        type: DataTypes.STRING(500)
    }
}, 
{
    timestamps: false
})

module.exports = RequestModel