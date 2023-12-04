const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize") 

const SubjectsModel = sequelize.define("subjects", {
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
    },
    BEED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSIT: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSBA: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSCA: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSHRM: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSED_ENG: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSED_MATH: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    BSCpE: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    semester: {
        type: DataTypes.STRING
 
    },
    year_level: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = SubjectsModel