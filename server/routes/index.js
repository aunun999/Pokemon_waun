const router = require('express').Router()
const Controller = require("../controllers")
const { authentication, authorization } = require('../middlewares/auth')

router.post('/register', Controller.Register)
router.post('/login', Controller.Login)

router.use(authentication)
router.get('/favourite', Controller.getFavourite)
router.post('/favourite/:id', Controller.addFavourite)

router.delete("/favourite/:id", authorization, Controller.deleteFavourite)

module.exports = router