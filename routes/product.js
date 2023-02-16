const router = require('express').Router()
const create = require('../controllers/createProductController')

router.route('/').post(create)

module.exports = router