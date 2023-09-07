const express = require("express")
const router = express.Router()
const RequestModel = require("../models/request")

// BROWSER URL: /admin
router.get("/", (req, res) =>{
    res.render("admin.ejs")
})

// BROWSER URL: /admin/adminRequest
router.get("/adminRequest", (req, res) => {
    res.render('admin/adminRequest.ejs')
})

// BROWSER URL: /admin/adminRequest
router.delete('/deleteRequest', async(req, res) => {
    try {
        const { id } = req.query

        await RequestModel.destroy({ where: { id } })

        const requests = await RequestModel.findAll({ raw: true })

        res.json({ operation: true, numberOfRequests: requests.length })
    } catch (error) {
        console.log(error)
        res.json({ operation: false })
    }
})

module.exports = router