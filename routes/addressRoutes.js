const express = require('express')
const router = express.Router()
const { addAddress, getAddresses } = require('../controllers/addressController')
const auth = require("../middlewares/authMiddleware")

router.post("/add", auth, addAddress);
router.get("/get", auth, getAddresses);

module.exports = router