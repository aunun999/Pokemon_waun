const { comparePass } = require("../helpers/bcrypjs")
const { generateToken } = require("../helpers/jwt")
const {User, Favourite} = require("../models")

class Controller {
  static async Register (req, res, next){
    try {
      let {name, email, password} = req.body
      let user = await User.create({name, email, password})

      res.status(201).json({
        id: user.id,
        email: user.email 
      })
    } catch (error) {
      next(error)
    }
  }
  
  static async Login (req, res, next){
    let {email, password} = req.body
    try {
      if (!email || !password) throw {name: "BadRequest"}
      const user = await User.findOne({where: {email: email}})
      if (!user) throw {name: "LoginFailed"}
      if(!comparePass(password, user.password)) throw {name: "LoginFailed"}
      let token = generateToken({id: user.id, email: user.email})
      res.status(200).json({access_token: token})
    } catch (error) {
      next(error)
    }
  }

  static async getFavourite (req, res, next){
    try {
      let { id } = req.userData
      let fav = await Favourite.findAll({ where: {UserId: id}})
      res.status(200).json(fav)
    } catch (error) {
      next(error)
    }
  }

  static async addFavourite (req, res, next){
    try {
      let fav = await Favourite.create({where: {UserId: req.userData.id, pokeId: req.params.id}})
      res.status(201).json({id: fav.id, pokeId: fav.pokeId})
    } catch (error) {
      next(error)
    }
  }

  static async deleteFavourite (req, res, next){
    try {
      let del = await Favourite.destroy({where: {id: req.params.id}})
      res.status(200).json({del}) 
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller