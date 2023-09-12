const express = require('express');
const app = express();
const port = 3000;
const connection = require("./config/db")
const cors = require("cors");
const RequestModel = require("./models/request")
const chalk = require("chalk")

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
app.use(express.json(), express.urlencoded({ extended: true }))
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



app.listen(port, () => {
  connection.connectToDB().then(() => {
    console.log(chalk.yellow("All models were synchronized successfully."));
    console.log(chalk.green(`Listening on port ${port}`))
  })
});
