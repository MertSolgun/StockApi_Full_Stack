"use strict";

const tokens = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await tokens
      .findOne({ token: tokenKey[1] })
      .populate("userId");
    req.user = tokenData ? tokenData.userId : undefined;
  }
  next();
};

// Login olmus kisinin tokeni olusuyor.
// burada req.headers.authorizationdan gelen
// tokene göre token modelinde findone yapıp o tokene ait userId'ye
// populate yapinca useri getirebiliyoruz
