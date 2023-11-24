const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize") 

const BridgingSubjectModel = sequelize.define("bridging_subject", {
    code: {
        type: DataTypes.STRING(100),
        defaultValue: null,
        unique: true
    },
    subjects: {
        type: DataTypes.STRING(200),
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
    "BSED-ENG": {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    "BSED-MATH": {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isopen: {
        type: DataTypes.BOOLEAN,
    }
    
})

module.exports = BridgingSubjectModel