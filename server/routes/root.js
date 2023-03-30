const express = require("express");
const router = express.Router();
const path = require("path");
// const refToken = require('./tokenGmail');
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "174239559227-5b1h79dis0qinpt3dce39reo0sba5odc.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3500";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getAcceToken = async () => {
  const { tokens } = await oAuth2Client.getToken(localStorage.getItem("code"));

  // const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;

  localStorage.setItem("refToken", refreshToken);
};

router.get("^/$|/index(.html)?", (req, res) => {
  var query = require("url").parse(req.url, true).query;
  var id = query.code;
  // if (typeof localStorage == undefined) {

  localStorage.setItem("code", id);
  getAcceToken();
  // }
  //refToken.getCode(id);
  console.log(id);
  // var option = query.option;
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
