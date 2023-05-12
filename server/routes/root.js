const express = require("express");
const router = express.Router();
const path = require("path");

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "14248122809-605fcjnkelku24q276ds87nku3io9gef.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getAcceToken = async () => {
  const { tokens } = await oAuth2Client.getToken(localStorage.getItem("code"));

  const refreshToken = tokens.refresh_token;
 
  localStorage.setItem("refToken", refreshToken);
};

router.get("^/$|/index(.html)?", (req, res) => {
  var query = require("url").parse(req.url, true).query;
  var id = query.code;

  localStorage.setItem("code", id);
  getAcceToken();

  console.log(id);

  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
