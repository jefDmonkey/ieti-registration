const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const MsgModel = sequelize.define("messages" ,{
   "Mes_ID": {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
   },
   FirstName: {
    type: DataTypes.STRING(255),
    defaultValue: null
   },
   LastName: {
    type: DataTypes.STRING(255),
    defaultValue: null
   },
   Email: {
    type: DataTypes.STRING(255),
    defaultValue: null
   },
   Phone: {
    type: DataTypes.STRING(11),
    defaultValue: null
   },
   Message: {
    type: DataTypes.STRING(1000),
    defaultValue: null
   }
},
{
    timestamps: false
})

module.exports = sequelize.models["messages"] || MsgModel