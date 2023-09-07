const { defaultValueSchemable } = require("sequelize/types/utils");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const StdInfoModel = sequelize.define("studentinfo" ,{
    "Stud_ID": {
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
    "date_of_Birth": {
     type: DataTypes.DATE(255),
     defaultValue: null
    },
    "Place_of_Birth": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Status: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Gender: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Religion: {
        type: DataTypes.STRING(2555),
        defaultValue: null
    },
    "Current_Address": {
        type: DataTypes.STRING(255),
        defaultValue:null
    },
    "Parent_or_Guardian": {
        type: DataTypes.STRING(255)
    },
    "Guardian_PhoneNumber": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "Provincial_Address": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    
 },
 {
     timestamps: false
 })
 
 module.exports = sequelize.models["studentinfo"] || StdInfoModel