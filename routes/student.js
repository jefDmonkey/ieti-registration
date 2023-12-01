const express = require("express")
const router = express.Router()
const { isLogout, isLoginStudent } = require("../middleware/isLogin")


router.get('/studDashboard', isLoginStudent, (req, res) =>{
    res.render('./student/studDashboard.ejs', { student: req.session.student })
})

router.get('/studRegistration', isLoginStudent, (req, res) =>{
    res.render('./student/studRegistration.ejs')
})



module.exports = router