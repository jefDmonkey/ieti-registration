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
const AccountsModel = require("../models/accounts")

// BROWSER URL: /admin
router.get("/", (req, res) =>{
    res.render("admin.ejs")
})

// BROWSER URL: /admin/adminRequest
router.get("/adminRequest", async(req, res) => {
   const accounts = await AccountsModel.findAll({raw: true});
   const profile = await AccountsModel.findAll({raw: true})
    res.render('admin/adminRequest.ejs', 
    {
        accounts
    })
    console.log(accounts)
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

//3rd steps
//endpoint
router.post('/postRequest', async(req, res) => {
    try {
        // GET THE ID
        const { id } = req.query
        // GET THE RECORD 
        const user = await RequestModel.findByPk(id, {raw: true}) ;
        //INSERT TO ACCOUNT
        await AccountsModel.create({
            ...user,
            image: user.user_image
        });
        await RequestModel.destroy({ where: { id } })
        const request = await RequestModel.findAll({ raw: true })
        const accounts =  await AccountsModel.findAll({raw: true})
        res.json({operation: true , numberOfRequests: request.length, numberofAccounts: accounts.length })
    } catch (error) {
        console.log(error)
        res.json({ operation: false })
    }
})


// BROWSER URL: /admin/adminRequest
router.delete('/deleteRequest', async(req, res) => {
    try {
        // GET THE ID
        const { id } = req.query

        //DELETE PICTURE
        const user = await RequestModel.findByPk(id, { raw: true })
        const fileLocation = `${process.cwd()}/public/${user.user_image}`
        await fs.unlink(fileLocation)

        //DELETE RECORD
        await RequestModel.destroy({ where: { id } })
        const requests = await RequestModel.findAll({ raw: true })

        //rESPONSE
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
        res.json({ operation: true })//heheh
    } catch (error) {
        res.json({ operation: false })
        console.log(error)
    }
})

module.exports = router