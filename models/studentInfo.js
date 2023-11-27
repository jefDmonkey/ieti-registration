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
    MiddleName:{
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Course: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Year: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Semester: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    Classification: {
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
     type: DataTypes.STRING(255),
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
    Nationality: {
        type: DataTypes.STRING(255),
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
    Occupation: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "sixth_grade_school": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "sixth_grade_year": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "tenth_grade_school": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "twelve_grade_year": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "college_school": {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    "college_year": {
        type: DataTypes.STRING(255),
        defaultValue: null
    }
    
 },
 {
     timestamps: false
 })
 
 module.exports = StdInfoModel