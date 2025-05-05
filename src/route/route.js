const express = require("express");
const router = express.Router()
const session = require("../controller/session")

router.post("/login", (req, res) =>{
    session.login(req, res)
})

router.get("/logout", (req, res) => {
    session.logout(req, res)
})

module.exports = router;