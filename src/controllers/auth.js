const userSchema = require("../models/user");
const tokenSchema = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await userSchema.findOne({ $or: [{ username }, { email }] });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          let tokenData = await tokenSchema.findOne({ userId: user._id });

          if (!tokenData) {
            tokenData = await tokenSchema.create({
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()),
            });
            res.status(200).send({
              error: false,
              token: tokenData.token,
              user,
            });
          }
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },
  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */
    const auth = req.headers?.authorization;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey && tokenKey[0] == "Token") {
      const data = await tokenSchema.deleteOne({ token: tokenKey[1] });
      res.status(200).send({
        error: false,
        data,
        message: "Token Deleted Log out Ok",
      });
    }
  },
};
