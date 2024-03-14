const express = require('express')
const { searchProduct } = require('../controllers/searchController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router()

router.get("/", auth, searchProduct);

module.exports = router