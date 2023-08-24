const express = require('express');
const app = express();
const port = 3000;
const connection = require("./config/db")
const cors = require("cors");
const multer = require('multer');//file upload

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
app.set("view engine","ejs");
app.use(express.json())
app.use(express.static("public"));

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

app.get ('/admin', (req, res) =>{
  res.render("admin.ejs")
})

app.get ('/navbar', (req, res) =>{
  res.render("navbar.ejs")
})

app.get('/contacts', (req, res) =>{
  res.render("contacts.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connection.connectToDB()
});
