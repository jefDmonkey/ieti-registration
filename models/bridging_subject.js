const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize") 

const BridgingSubjectModel = sequelize.define("bridging_subject", {
    code: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    subject_name: {
        type: DataTypes.STRING(200),
        defaultValue: null
    },
    units: {
        type: DataTypes.STRING(200),
        defaultValue: null
    },
    BSCpE: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    "BSED_ENG": {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    "BSED_MATH": {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isopen: {
        type: DataTypes.BOOLEAN,
    }
},
{
    timestamps: false
})

module.exports = BridgingSubjectModel