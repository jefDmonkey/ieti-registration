const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize") 

const SecondYearModel = sequelize.define("course_subject_2ndyear", {
    code: {
        type: DataTypes.STRING(100),
        defaultValue: null,
        unique: true
    },
    subjects: {
        type: DataTypes.STRING(200),
        defaultValue: null
    },
    units: {
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
    Semester: {
        type: DataTypes.INTEGER,

    }
})

module.exports = SecondYearModel