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
const SubjectsModel = require("../models/subjects")
const BridgingSubjectModel = require("../models/bridging_subject")
const { isLogout, isLoginAdmin } = require("../middleware/isLogin")
const { QueryTypes, Sequelize, Op } = require("sequelize")
const AdminAccountModel = require("../models/admin_account")
const sequelize = require("../config/db").sequelize

// BROWSER URL: /admin
router.get("/", isLoginAdmin, (req, res) =>{
    res.render("admin.ejs")
})

router.get("/form", isLoginAdmin, (req, res) => {
    res.render('admin/form.ejs')
})

router.get("/settings", isLoginAdmin, (req, res) => {
    res.render("admin/settings.ejs", { admin: req.session.admin})
})

// BROWSER URL: /admin/adminRequest
router.get("/adminRequest", isLoginAdmin, async(req, res) => {
   const accounts = await AccountsModel.findAll({raw: true});
    res.render('admin/adminRequest.ejs', 
    {
        accounts,
        admin: req.session.admin
    })
})

router.get("/studentCourse",isLoginAdmin, async(req, res) =>{

    const allCourses = await StdInfoModel.findAll({ where: { enrolment_status: "ENROLLED" }, raw: true })
    
    const BSIT = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BSIT"
    })) || []

    const BSCpE = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BSCpE"
    })) || []

    const BSCA = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BSCA"
    })) || []

    const BSBA = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BSBA"
    })) || []

    const BSHRM = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BSHRM"
    })) || []

    const BEED = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"] == "BEED"
    })) || []

    const BSED = (allCourses.length >= 1 && allCourses.filter((student) => {
        return student["Course"].includes("BSED")
    })) || []

    res.render('admin/studentCourse.ejs',
    {
        BSIT,
        BSCA,
        BSBA,
        BSHRM,
        BEED,
        BSCpE,
        BSED,
        admin: req.session.admin
    })
})

router.get("/enrolledStud", isLoginAdmin, (req, res) =>{
    res.render('admin/enrolledStud.ejs')
})

router.get("/formRequest", isLoginAdmin, async(req, res) => {
    const registration_forms = await StdInfoModel.findAll({ where: { enrolment_status: "PENDING" }, raw: true })
    res.render('admin/formRequest.ejs', { registration_forms, admin: req.session.admin })
})

router.get("/studentInfo", isLoginAdmin, (req, res) => {
    res.render('admin/studentInfo')
})

router.get("/adminSubjects",isLoginAdmin,  async(req, res) => {
    const subjects = await SubjectsModel.findAll({ raw: true })
    res.render('admin/adminSubjects.ejs', { subjects, admin: req.session.admin })
})

router.get("/msgInbox", isLoginAdmin, (req, res) => {
   res.render('admin/msgInbox.ejs')
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
        let { fullname, email, contact, password, filename } = req.body

        const checkEmailAdmin = await AdminAccountModel.findAll({
            where: {
                email
            },
            raw: true
        })

        const checkUserEmail = await AccountsModel.findAll({
            where: {
                email
            },
            raw: true
        })

        const checkEmail = await RequestModel.findAll({
            where: {
                email: email
            },
            raw: true
        })

        if(checkEmail.length >= 1 || checkUserEmail.length >= 1 || checkEmailAdmin.length >= 1){
            return res.json({ operation: false, msg: "Email already exist" })
        }

        password = await bcrypt.hash(password, 10)

        await RequestModel.create({
            fullname,
            email,
            password,
            contacts: contact,
            user_image: `/user_images/${filename}`
        })
        res.json({ operation: true, msg: "Data Sent" })
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
            deg_year,
            selected_subjects
        } = req.body

        await StdInfoModel.create({
            id: req.session.student.id,
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
            "college_year": deg_year,
            selected_subjects: JSON.stringify(selected_subjects)
        })

        res.status(200).json({ msg: "Data sent" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
})
 
// endpoint
router.post("/jeffersonpogi", async(req, res) => {
    try {
        const { code, s_name, units, year, semester, courses } = req.body

        const checkExisting = await SubjectsModel.findAll({
            where: {
                code
            },
            raw: true
        })

        if(checkExisting.length >= 1) return res.json({ operation: false, msg: "Subject already exist" })

        await SubjectsModel.create({
            code,
            subject_name: s_name,
            units,
            year_level: year,
            semester,
            BEED: courses.includes("BEED"),
            BSIT: courses.includes("BSIT"),
            BSCpE: courses.includes("BSCpE"),
            BSED_ENG: courses.includes("BSED_ENG"),
            BSED_MATH: courses.includes("BSED_MATH"),
            BSBA: courses.includes("BSBA"),
            BSCA: courses.includes("BSCA"),
            BSHRM: courses.includes("BSHRM")
        })

        return res.json({ operation: true,  msg: "Success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ operation: false, msg:"Server Error" })
    }
})

router.delete("/deleteSubject", async(req, res) => {
    try {
        const { code } = req.query
        await SubjectsModel.destroy({
            where: {
                code
            }
        })
        return res.json({ operation: true, msg: "Success" })
    } catch (error) {
        console.log(error)
        res.json({ operation: false })
    }
})


router.delete("/deleteAccount", async(req, res) => {
    try {
        const { account_id } = req.query

        await AccountsModel.destroy({ where: { id: account_id } })
        await StdInfoModel.destroy({ where: { id: account_id } })

        res.json({ operation: true, msg: "Success" })
    } catch (error) {
        console.log(error)
    }
})

router.get("/getstudentdata", async(req, res) => {
    try {
        const { id } = req.query

        let student = await StdInfoModel.findOne({ where: { uid: id }, raw: true })
        
        const parsed = JSON.parse(student.selected_subjects)

        const completeInfoSubject = []

        for (let i = 0; i < parsed.length; i++) {
            const semsubjectInfo = await SubjectsModel.findOne({ 
                attributes: ["code","subject_name", "units"], 
                where: { code: parsed[i] }, 
                raw: true 
            })

            const bridgingsubjectinfo = await BridgingSubjectModel.findOne({ 
                attributes: ["code","subject_name", "units"], 
                where: { code: parsed[i] }, 
                raw: true 
            })

            if(semsubjectInfo) completeInfoSubject.push(semsubjectInfo)
            if(bridgingsubjectinfo) completeInfoSubject.push(bridgingsubjectinfo)
        }

        student = {
            ...student,
            selected_subjects: completeInfoSubject
        }
        
        res.json({ operation: true, data: student })

    } catch (error) {
        console.log(error)
    }
})

router.put("/modifyenrolment", async(req, res) => {
    try {
        const { action, id } = req.query

        if(action == "ACCEPT"){
            await StdInfoModel.update({ enrolment_status: "ENROLLED" }, { where: { uid: id } })
            res.json({ operation: true })
        }else{
            await StdInfoModel.destroy({ where: { uid: id } })
            res.json({ operation: true })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/get_student_subj_list_and_selected", async(req, res) => {
    try {
        const { id } = req.query

        const student = await StdInfoModel.findOne({ where: { id, enrolment_status: "ENROLLED" }, raw: true })
        const account = await AccountsModel.findOne({ where: { id }, raw: true })
        let sem_subjects = []
        let bridging_subjects = []
        let completeInfoSubject = []

        if(student){
            sem_subjects = await SubjectsModel.findAll({ where: { [student["Course"]]: true }, raw: true })

            bridging_subjects = await BridgingSubjectModel.findAll({ where: { [student["Course"]]: true }, raw: true })

            const parsed = JSON.parse(student.selected_subjects)

            for (let i = 0; i < parsed.length; i++) {
                const semsubjectInfo = await SubjectsModel.findOne({ 
                    attributes: ["code","subject_name", "units"], 
                    where: { code: parsed[i] }, 
                    raw: true 
                })

                const bridgingsubjectinfo = await BridgingSubjectModel.findOne({ 
                    attributes: ["code","subject_name", "units"], 
                    where: { code: parsed[i] }, 
                    raw: true 
                })

                if(semsubjectInfo) completeInfoSubject.push(semsubjectInfo)
                if(bridgingsubjectinfo) completeInfoSubject.push(bridgingsubjectinfo)
            }
        }

        res.json({
            account,
            student,
            sem_subjects,
            bridging_subjects,
            completeInfoSubject
        })
    } catch (error) {
        console.log(error)
    }


})


router.patch("/drop_subject", async(req, res) => {
    try {
        const { code, id } = req.query

        const student = await StdInfoModel.findOne({ attributes: ["selected_subjects"], where: { uid: id }, raw: true })
        const newSubjects = JSON.parse(student["selected_subjects"])
        newSubjects.splice(newSubjects.indexOf(code), 1)
        await StdInfoModel.update({ selected_subjects: JSON.stringify(newSubjects) }, { where: { uid: id } })

        res.json({ operation: true })
        
    } catch (error) {
        console.log(error)
    }
})

router.patch("/add_student_subject", async(req, res) => {
    try {
        const { code, uid, id } = req.query

        let passed_subjects = await StdInfoModel.findAll({
            attributes: ["passed_subjects"],
            where: {
                id
            },
            raw: true
        })
        
        if(passed_subjects.length >= 1){
            passed_subjects = passed_subjects.map((val) => {
                return JSON.parse(val.passed_subjects)
            }).flat()

            if(passed_subjects.indexOf(code) >= 0) return res.json({ operation: false, msg: "Subject already passed" }) 
        }

        let subject = await SubjectsModel.findOne({ where: { code }, raw: true })
        if(!subject) subject = await BridgingSubjectModel.findOne({ where: { code }, raw: true })

        const student = await StdInfoModel.findOne({ attributes: ["selected_subjects", "passed_subjects"], where: { uid }, raw: true })

        if(student["passed_subjects"]){
            let checker = false
            JSON.parse(student["passed_subjects"]).forEach((subj_code) => {
                if(subj_code == code) return checker = true
            })

            if(checker) return res.json({ operation: false, msg: "Subject already passed" })
        }

        const newSubjects = JSON.parse(student["selected_subjects"])
        newSubjects.push(code)

        await StdInfoModel.update({ selected_subjects: JSON.stringify(newSubjects) }, { where: { uid } })

        console.log(subject)

        res.json({ operation: true, subj: subject })
    } catch (error) {
        console.log(error)
    }
})

router.patch("/pass_subject", async(req, res) => {
    try {
        const { codes, id } = req.query

        await StdInfoModel.update({ selected_subjects: "[]", passed_subjects: codes }, { where: { uid: id } })

        res.json({ operation: true })

    } catch (error) {
        console.log(error)
    }
})

router.put("/nextyear", async(req, res) => {
    try {
        
        const enrolment_forms = await StdInfoModel.findAll({ attributes: ["uid","selected_subjects","passed_subjects"], where: { enrolment_status: "ENROLLED" }, raw: true })

        if(enrolment_forms.length >= 1){
            for(let i = 0; i < enrolment_forms.length; i++){
                let passed = JSON.parse(enrolment_forms[i].passed_subjects)
                let enrolled = JSON.parse(enrolment_forms[i].selected_subjects)

                let newPassed = [ ...new Set([ ...passed, ...enrolled ]) ]

                await StdInfoModel.update({ selected_subjects: "[]", passed_subjects: JSON.stringify(newPassed) },{ where: { uid: enrolment_forms[i].uid } })
            }
        }

        await StdInfoModel.update({ enrolment_status: "DONE" },{ where: { enrolment_status: "ENROLLED" } })
        res.json({ operation: true, msg: "Success" })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router