const express = require("express")
const router = express.Router()
const { isLogout, isLoginStudent } = require("../middleware/isLogin")
const RequestModel = require("../models/request")
const SubjectsModel = require("../models/subjects")
const BridgingSubjectModel = require("../models/bridging_subject")
const AccountsModel = require("../models/accounts")
const StdInfoModel = require("../models/studentInfo")
const { Op } = require("sequelize")


router.get('/studDashboard', isLoginStudent, (req, res) =>{
    console.log(req.session.student)
    res.render('./student/studDashboard.ejs', { student: req.session.student })
})

router.get('/studRegistration', isLoginStudent, (req, res) =>{
    res.render('./student/studRegistration.ejs')
})

router.get('/subjectsTaken', async(req, res) => {
    const { id } = req.session.student

    let enrolled_codes = await StdInfoModel.findOne({ attributes: ["selected_subjects"],  where: { id, enrolment_status: "ENROLLED" }, raw: true })
    let taken_codes = await StdInfoModel.findAll({ attributes: ["passed_subjects"], where: { id, [Op.or]: [{ enrolment_status: "DONE" }, { enrolment_status: "ENROLLED" }] }, raw: true })

    enrolled_codes = (enrolled_codes && JSON.parse(enrolled_codes["selected_subjects"])) || []
    taken_codes = [ ...new Set([ ...taken_codes.map((subj) => (JSON.parse(subj.passed_subjects))).flat() ]) ]

    const enrolled_subjects = []
    const taken_subjects = []

    for(let i = 0;i < enrolled_codes.length; i++){
        let subj = await SubjectsModel.findOne({ where: { code: enrolled_codes[i] }, raw: true })

        if(!subj){
            subj = await BridgingSubjectModel.findOne({ where: { code: enrolled_codes[i] }, raw: true })
        }

        enrolled_subjects.push(subj)
    }

    for(let i = 0;i < taken_codes.length; i++){
        let subj = await SubjectsModel.findOne({ where: { code: taken_codes[i] }, raw: true })

        if(!subj){
            subj = await BridgingSubjectModel.findOne({ where: { code: taken_codes[i] }, raw: true })
        }

        taken_subjects.push(subj)
    }

    console.log(enrolled_subjects)
    console.log(taken_subjects)

    res.render('./student/subjectsTaken.ejs', {
        enrolled_subjects,
        taken_subjects
    })
})

router.get("/checkForm", async(req, res) => {
    try {
        
        const check = await StdInfoModel.findOne({ 
            where: { 
                id: req.session.student.id, 
                [Op.or]: [
                    { enrolment_status: "PENDING" },
                    { enrolment_status: "ENROLLED" }
                ] 
            }, 
            raw: true
         })

        if(check) return res.json({ operation: false })
        res.json({ operation: true })
    } catch (error) {
        console.log(error)
    }
})


router.get("/get_course_subject", async(req, res) => {
    try {
        const { selectedCourse, selectedYear, selectedSem } = req.query

        let passed_codes = await StdInfoModel.findAll({
            attributes: [ "passed_subjects" ],
            where: {
                id: req.session.student.id
            },
            raw: true
        })

        if(passed_codes.length >= 1){
            passed_codes = passed_codes.map((val) => {
                return JSON.parse(val.passed_subjects)
            }).flat()
        }else{
            passed_codes = null
        }
    
        let AllBSITSubjects = await SubjectsModel.findAll({ 
            where: { 
                [selectedCourse]: true, 
                year_level: selectedYear, 
                semester: selectedSem  
            }, 
            raw: true 
        })

        let AllBSITBridgingSubjects = await BridgingSubjectModel.findAll({ 
            where: { 
                [selectedCourse]: true 
            }, 
            raw: true 
        })

        if(passed_codes){
            AllBSITSubjects = AllBSITSubjects.filter((subj) => {
                if(passed_codes.indexOf(subj.code) <= -1){
                    return subj
                }
            })

            AllBSITBridgingSubjects = AllBSITBridgingSubjects.filter((subj) => {
                if(passed_codes.indexOf(subj.code) <= -1){
                    return subj
                }
            })
        }

        res.json({ 
            operation: true, 
            semester_subjects: AllBSITSubjects,
            bridging_subjects: AllBSITBridgingSubjects
        })

    } catch (error) {
        console.log(error)
    }
})

router.get("/get_taken_subjects", async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})



module.exports = router