var axios = require("axios");
const pdf2base64 = require("pdf-to-base64");
var qs = require("qs");
const Base64 = require("js-base64");
const Excel = require("../model/Excel");
const PDFParser = require("pdf-parse");
const encode = require("js-base64");
const { response } = require("express");

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "14248122809-605fcjnkelku24q276ds87nku3io9gef.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getToken = async () => {
  const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

  const authUrl = oAuth2Client.generateAuthUrl({ 
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("url");
  console.log(authUrl);
  localStorage.setItem("authUrl", authUrl);
};

class GmailAPI {
  accessToken = "";
  aT = false;

  constructor() {
    this.aT = this.getAcceToken();
  }

  getAcceToken = async () => {
    var data = qs.stringify({
      client_id:
        "14248122809-605fcjnkelku24q276ds87nku3io9gef.apps.googleusercontent.com",

      client_secret: "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",

      refresh_token:
        // "1//0gXLTMNnJ9Y2wCgYIARAAGBASNwF-L9Ir8l9IV34baxFTN6OhkcNCLe7hT2MtY3OhiV4mJL9fAGXuInjJXd_ThzSacCLb39Pjs7g",
        localStorage.getItem("refToken"),
      grant_type: "refresh_token",
    });
    var config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let accessToken = "";

    await axios(config)
      .then(async function (response) {
        accessToken = await response.data.access_token;

        console.log("Access Token " + accessToken);
      })
      .catch(function (error) {
        console.log(error.response.data.error);

        return false;
      });

    return accessToken;
  };

  searchGmail = async (searchItem, at) => {
    var config1 = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        // Authorization: `Bearer ${await this.accessToken} `,
        Authorization: `Bearer ${await at} `,
      },
    };
    var threadId = "";

    await axios(config1)
      .then(async function (response) {
        if (response.data) {
          threadId = await response.data["messages"][0].id;
        } else {
          return false;
        }

        console.log("ThreadId = " + threadId);
      })
      .catch(function (error) {});

    return threadId;
  };

  readGmailContent = async (messageId, at) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        // Authorization: `Bearer ${await this.accessToken}`,
        Authorization: `Bearer ${await at} `,
      },
    };

    var data = {};

    await axios(config)
      .then(async function (response) {
        data = await response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

  GmailContent = async (threadId, messageId, at) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}/attachments/${messageId}`,
      headers: {
        Authorization: `Bearer ${await at} `,
      },
    };

    var data = "";
    await axios(config)
      .then(async function (response) {
        data = await response;
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

  readInboxContent = async (data, req, res) => {
    console.log(this.aT);
    console.log("h");
    console.log((await this.aT).toString());

    if (!this.aT || !(await this.aT).toString()) {
      this.aT = this.getAcceToken();
      if (!this.aT || !(await this.aT).toString()) {
        getToken();
      }
    } else {
      localStorage.removeItem("authUrl");

      for (var k = 0; k < data.length; k++) {
        var s = "filename:pdf from:";

        var s1 = s.concat(data[k].email);

        const threadId = await this.searchGmail(s1, this.aT);
        if (!threadId) {
        } else {
          const message = await this.readGmailContent(threadId, this.aT);

          const encodedMessage = await message.payload["parts"][1].body
            .attachmentId;
          console.log(message.payload["parts"][1].body.attachmentId);

          const dat = await this.GmailContent(
            threadId,
            encodedMessage,
            this.aT
          );
          console.log(typeof dat.data.data);

          const pdfBuffer = Buffer.from(dat.data.data, "base64");
          const pdfUrl = `data:application/pdf;base64,${pdfBuffer.toString(
            "base64"
          )}`;

          const pdfData = await PDFParser(pdfBuffer);

          const terms = [
            "1:Tuition Fee",
            "1: Tuition Fee",
            "1 : Tuition Fee",
            "1 :Tuition Fee",
          ];

          // check if the string has some of the terms
          const result1 = terms.some((term) => pdfData.text.includes(term));
          console.log(result1);

          if (result1) {
            console.log("PDF scanned successfully.");
            data[k].response = pdfUrl;
          }

          console.log("hii");
        }
      }

      for (var k = 0; k < data.length; k++) {
        var myquery = { email: data[k].email };
        var newvalues = { $set: { response: data[k].response } };
        Excel.updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          // console.log("1 document updated");
        });
      }
    }
  };
}

module.exports = new GmailAPI();
