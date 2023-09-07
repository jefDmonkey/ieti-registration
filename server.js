const express = require('express');
const app = express();
const port = 3000;
const connection = require("./config/db")
const cors = require("cors");
const multer = require('multer');//file upload
const RequestModel = require("./models/request")

//database
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: '',
//   database: "db2"
// });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("database connected")
// });


//middleware
app.use(express.static("public"));
app.use(express.json())
app.set("view engine","ejs");
app.set("views", "views")

 app.use(cors())

// app.get("/profile", (req, res) => {
//   con.query(`SELECT * FROM course_subjects_1st`, (error, result) => {
//     if(error) throw error;
//     res.status(200).json({ 
//       name: "jep", 
//       title: result[0].title 
    
//     }
// )

//   })
// })

//API ROUTES
app.use("/api/contact", require("./routes/contact"))

//routes
app.get('/login',(req, res) => {
    res.render("login.ejs")
});

app.get('/homepage', (req, res) => {
  res.render("homepage.ejs")
});

app.get ('/register', (req, res) => {
  res.render("register.ejs")
});

// ALL REQUEST (GET, POST, DELETe, PUT, PATCH)
app.use('/admin', require("./routes/admin"))

app.get ('/navbar', (req, res) =>{
  res.render("navbar.ejs")
})

app.get('/contacts', (req, res) =>{
  res.render("contacts.ejs")
})

app.get('/adminDashboard', async (req, res) => {

  const requests = await RequestModel.findAll({ raw: true })

  // console.log(requests)

  res.render('adminDashboard.ejs',
  {
    numberOfRequests: requests.length,
    requests
  })
})

app.get('/reg', (req, res) =>{
  res.render('reg.ejs')
})

app.get('/sidebar',async (req, res) =>{
  await RequestModel.bulkCreate([
    {
      fullname: "Jeff M. Garcia",
      course: "BSIT",
      email: "jeff@gmail.com",
      contacts: "09999999999",
      address: "Magsaysay",
      gender: "Male"
    },
    {
      fullname: "John Jhovir A. Sorila",
      course: "BSIT",
      email: "jjj@gmail.com",
      contacts: "09999999999",
      address: "San Jose",
      gender: "Male"
    }
  ])
  res.json("ok")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connection.connectToDB()
});
