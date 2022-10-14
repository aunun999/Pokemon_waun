const { sign, verify } = require("jsonwebtoken");

module.exports ={
  generateToken: (payload) => sign(payload, "gakusahkepo!!"),
  decodeToken: (token) => verify(token, "gakusahkepo!!")
}