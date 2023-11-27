const express = require("express")
const router = express.Router()


router.get('/studDashboard', (req, res) =>{
    res.render('./student/studDashboard.ejs')
})

router.get('/studRegistration', (req, res) =>{
    res.render('./student/studRegistration.ejs')
})



module.exports = router