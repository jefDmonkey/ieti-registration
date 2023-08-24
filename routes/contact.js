const express = require("express")
const router = express.Router();
const MsgModel = require("../models/message")

router.post("/", async (req, res) => {
    try {
      const { fname, lname, email, phone, msg } = req.body;
      await MsgModel.create({
        FirstName: fname,
        Message: msg,
        LastName: lname,
        Phone: phone,
        Email: email
      })
      res.json({ operation: true })
    } catch (error) {
      console.log(error)
      res.json({ operation: false })
    }
})

module.exports = router