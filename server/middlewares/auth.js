const { decodeToken } = require("../helpers/jwt")
const {User, Favourite} = require("../models")

module.exports = {
  authentication: async (req, res, next) => {
    try {
      if(!req.headers.access_token) throw { name: "MissingAccessToken"}
      let {id, email} = decodeToken(req.headers.access_token)
      let user = User.findOne({where: {email, id}})
      if(!user) throw {name: "Unauthorized"}
      req.userData = {
        email: user.email,
        id: user.id
      }
      next()
    } catch (error) {
      next(error)
    }
  },
  authorization: async (req, res, next) => {
    try {
      let idFav = req.params.id
      let fav = await Favourite.findOne({where: {id: idFav}})
      if (!fav) throw {name: "NotFound"}
      if (fav.UserId !== req.userData.id) throw {name: "Forbidden"}
      next()
    } catch (error) {
      next(error)
    }
  }
}