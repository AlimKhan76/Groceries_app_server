const app = require('express')
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')
const router = app.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/userData", auth, getUserInfo)

module.exports = router