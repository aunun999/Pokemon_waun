let { hashSync, genSaltSync, compareSync } = require("bcryptjs")
module.exports = {
  hashPass: pass => hashSync(pass, genSaltSync(10)),
  comparePass: (pass, passDB) => compareSync(pass, passDB)
}