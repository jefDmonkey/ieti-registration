const { sequelize } = require("../config/db")
const { DataTypes} = require("sequelize")

const incompleteModel = sequelize.define("incomplete",
{
    code: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    subject_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    units: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }
},
{
    timestamps: false
})

module.exports = incompleteModel