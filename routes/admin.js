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
const StdInfoModel = require("../models/studentInfo")

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

router.get("/formRequest", async(req, res) => {
    const registration_forms = await StdInfoModel.findAll({ raw: true })

    res.render('admin/formRequest.ejs', { registration_forms })
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

        const checkEmail = await RequestModel.findAll({
            where: {
                email: email
            },
            raw: true
        })

        if(checkEmail.length >= 1){
            return res.json({ operation: false, msg: "Email already exist" })
        }

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
        res.json({ operation: true, msg: "Data Sent" })//heheh
    } catch (error) {
        res.json({ operation: false, msg: "Server Error" })
        console.log(error)
    }
})

//REGISTER STUDENT (ENROLMENT FORM)
router.post("/registerform", async(req, res) => {
    try {
        let {
            fname,
            mname,
            lname,
            course,
            year,
            sem,
            s_number,
            classy,
            dob,
            pob,
            sex,
            nationality,
            status,
            religion,
            contact,
            email,
            address,
            province,
            guardian,
            guardian_num,
            occupation,
            six,
            six_year,
            ten,
            ten_year,
            twelve,
            twelve_year,
            degree,
            deg_year
        } = req.body


        await StdInfoModel.create({
            "Stud_ID": s_number,
            FirstName: fname,
            LastName: lname,
            MiddleName: mname,
            Course: course,
            Year: year,
            Semester: sem,
            Classification: classy,
            Email: email,
            Phone: contact,
            "date_of_Birth": dob,
            "Place_of_Birth": pob,
            Status: status,
            Gender: sex,
            Religion: religion,
            Nationality: nationality,
            "Current_Address": address,
            "Parent_or_Guardian": guardian,
            "Guardian_PhoneNumber": guardian_num,
            "Provincial_Address": province,
            Occupation: occupation,
            "sixth_grade_school": six,
            "sixth_grade_year": six_year,
            "tenth_grade_school": ten,
            "tenth_grade_year": ten_year,
            "twelve_grade_school": twelve,
            "twelve_grade_year": twelve_year,
            "college_school": degree,
            "college_year": deg_year
        })

        res.status(200).json({ msg: "Data sent" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
})

module.exports = router