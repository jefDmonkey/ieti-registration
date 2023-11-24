const express = require("express")
const router = express.Router()


router.get('/studDashboard', (req, res) =>{
    res.render('./student/studDashboard.ejs')
})



module.exports = router