const express = require("express")
const Route = express.Router()
const CtrlUser = require("../controllers/user")
const auth = require("../middleware/auth")

Route.post("/signup", CtrlUser.signUp)
  .post("/signin", CtrlUser.signIn)
.get("/:id", auth.auth, CtrlUser.getbyId)

module.exports = Route