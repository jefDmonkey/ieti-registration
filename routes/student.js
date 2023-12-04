const express = require("express")
const router = express.Router()
const { isLogout, isLoginStudent } = require("../middleware/isLogin")
const RequestModel = require("../models/request")
const SubjectsModel = require("../models/subjects")
const BridgingSubjectModel = require("../models/bridging_subject")
const AccountsModel = require("../models/accounts")
const StdInfoModel = require("../models/studentInfo")


router.get('/studDashboard', isLoginStudent, (req, res) =>{
    res.render('./student/studDashboard.ejs', { student: req.session.student })
})

router.get('/studRegistration', isLoginStudent, (req, res) =>{
    res.render('./student/studRegistration.ejs')
})

router.get('/subjectCourse', isLoginStudent, (req, res) => {
    router.post("/subjectCourse", async(req, res) =>{
       const { code } = req.query
 
       const subjects = await SubjectsModel.findByPk(code, {raw: true});
    })
    res.render('./student/subjectCourse.ejs')
} )

router.get("/checkForm", async(req, res) => {
    try {
        const check = await StdInfoModel.findOne({ where: { id: req.session.student.id }, raw: true })
        if(check) return res.json({ operation: false })
        res.json({ operation: true })
    } catch (error) {
        console.log(error)
    }
})


router.get("/get_course_subject", async(req, res) => {
    try {
        const { selectedCourse, selectedYear, selectedSem } = req.query
    
        const AllBSITSubjects = await SubjectsModel.findAll({ 
            where: { 
                [selectedCourse]: true, 
                year_level: selectedYear, 
                semester: selectedSem  
            }, 
            raw: true 
        })

        const AllBSITBridgingSubjects = await BridgingSubjectModel.findAll({ 
            where: { 
                [selectedCourse]: true 
            }, 
            raw: true 
        })

        res.json({ 
            operation: true, 
            semester_subjects: AllBSITSubjects,
            bridging_subjects: AllBSITBridgingSubjects
        })

    } catch (error) {
        console.log(error)
    }
})





module.exports = router