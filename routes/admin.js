const express = require("express")
const router = express.Router()
const RequestModel = require("../models/request")
const path = require("path")
const uuid = require("uuid")
const multer = require('multer');
const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.resolve(process.cwd(),"public","user_images"));
        },
        filename: (req, file, cb) => {
            const newFilname = `${uuid.v4()}.png`
            req.body.filename = newFilname
            cb(null, newFilname)
        },
      })
 })
const bcrypt = require("bcryptjs")
const fs = require("fs/promises")

// BROWSER URL: /admin
router.get("/", (req, res) =>{
    res.render("admin.ejs")
})

// BROWSER URL: /admin/adminRequest
router.get("/adminRequest", (req, res) => {
    res.render('admin/adminRequest.ejs')
})

router.get("/studentCourse", (req, res) =>{
    res.render('admin/studentCourse.ejs')
})

router.get("/formRequest", (req, res) => {
    res.render('admin/formRequest.ejs')
})

router.get("/studentInfo", (req, res) => {
    res.render('admin/studentInfo')
})


// BROWSER URL: /admin/adminRequest
router.delete('/deleteRequest', async(req, res) => {
    try {
        const { id } = req.query

        const user = await RequestModel.findByPk(id, { raw: true })

        console.log(user)

        const fileLocation = `${process.cwd()}/public/${user.user_image}`

        await fs.unlink(fileLocation)

        await RequestModel.destroy({ where: { id } })

        const requests = await RequestModel.findAll({ raw: true })

        res.json({ operation: true, numberOfRequests: requests.length })
    } catch (error) {
        console.log(error)
        res.json({ operation: false })
    }
})

router.post("/submitrequest", upload.single("chosenFile"), async(req, res) => {
    try {
        let { fullname, course, email, contact, address, chosenGender, password, filename } = req.body

        password = await bcrypt.hash(password, 10)

        await RequestModel.create({
            fullname,
            course,
            email,
            password,
            contacts: contact,
            address,
            gender: chosenGender,
            user_image: `/user_images/${filename}`
        })
        res.json({ operation: true })
    } catch (error) {
        res.json({ operation: false })
        console.log(error)
    }
})

module.exports = router