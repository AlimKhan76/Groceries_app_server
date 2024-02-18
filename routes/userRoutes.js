const app = require('express')
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController')
const router = app.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/userData", getUserInfo)
module.exports = router