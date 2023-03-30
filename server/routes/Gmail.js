var axios = require("axios");
const pdf2base64 = require("pdf-to-base64");
var qs = require("qs");
const Base64 = require("js-base64");

const encode = require("js-base64");
const { response } = require("express");

var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');


const CLIENT_ID = '174239559227-5b1h79dis0qinpt3dce39reo0sba5odc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
// const CLIENT_ID = '662553580017-8uopar70h36iu7i5i3k7m9i2nt1s5qas.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3500';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getToken = async () => {

    const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    localStorage.setItem('authUrl', authUrl);


}



class GmailAPI {
    accessToken = "";
    aT = false;

    constructor() {

        this.aT = this.getAcceToken();
    }

    getAcceToken = async () => {
        var data = qs.stringify({
            client_id:
                "174239559227-5b1h79dis0qinpt3dce39reo0sba5odc.apps.googleusercontent.com",
                // "662553580017-8uopar70h36iu7i5i3k7m9i2nt1s5qas.apps.googleusercontent.com",
            client_secret: 
            "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",
            // "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",
            //   refresh_token:
            //     "1//0g_mTCoe1vXauCgYIARAAGBASNwF-L9IrI4o7R4kXd8vXsWlGEYE43zvrazAXm8-LB2NGBhhnnFCJVl6K7YMya1N8R8svILdFc1U",
            refresh_token: 
            // "1//0gXLTMNnJ9Y2wCgYIARAAGBASNwF-L9Ir8l9IV34baxFTN6OhkcNCLe7hT2MtY3OhiV4mJL9fAGXuInjJXd_ThzSacCLb39Pjs7g",
            localStorage.getItem('refToken'),
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
                //  = false;
                // if (error.response.data.error === 'invalid_grant') {
                return false;
                // }
            });

        return accessToken;
    };

    searchGmail = async (searchItem,at) => {
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
                if(response.data)
                {
                    threadId = await response.data["messages"][0].id;
                }
                else
                {
                    return false;
                }

                console.log("ThreadId = " + threadId);
            })
            .catch(function (error) {
                
                // ac=false;
                // console.log(error);
            });

        return threadId;
    };

    readGmailContent = async (messageId,at) => {
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

    GmailContent = async (threadId, messageId,at) => {
        var config = {
            method: "get",
            url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}/attachments/${messageId}`,
            headers: {
                // Authorization: `Bearer ${await this.accessToken}`,
                Authorization: `Bearer ${await at} `,
            },
        };

        // const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}/attachments/${messageId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${await this.accessToken}`
        //   }
        // });
        // const data = await response.json();
        var data = "";
        await axios(config)
            .then(async function (response) {
                // data = await response.data;
                data = await response;
                // console.log(data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        return data;
    };

    readInboxContent = async (data, req, res) => {
       

        // if (ac=='false') {
        //     getToken();
        //     res.send(localStorage.getItem('authUrl'));

        // }

        // if(!this.aT)
        console.log(this.aT);
        console.log("h");
        console.log((await this.aT).toString());

        // let aT = this.getAcceToken();
        // console.log("byy");
        // console.log((await aT).toString()); 

        if(!this.aT || !(await this.aT).toString())
        {
            this.aT = this.getAcceToken();
            if(!this.aT || !(await this.aT).toString())
            {
                getToken();
                res.send(localStorage.getItem('authUrl'));
            }
        }
        else
        { 

         
            
            
            for (var k = 0; k < data.length; k++) { 
                var s = "filename:pdf from:";
                
                var s1 = s.concat(data[k].email);  
                
                const threadId = await this.searchGmail(s1,this.aT);
                if (!threadId) {
                    
            } else {
                const message = await this.readGmailContent(threadId,this.aT);
                
                // const encodedMessage = await message.payload["parts"][0].body;
                // console.log(message.payload["parts"][0]);
                
                const encodedMessage = await message.payload["parts"][1].body
                .attachmentId;
                console.log(message.payload["parts"][1].body.attachmentId);
                
                const dat = await this.GmailContent(threadId, encodedMessage,this.aT);
                console.log(typeof dat.data.data);
                
                const pdfBuffer = Buffer.from(dat.data.data, "base64");
                const pdfUrl = `data:application/pdf;base64,${pdfBuffer.toString(
                    "base64"
                    )}`;

                    // res.contentType('application/pdf');
                    
                    // res.send(pdfUrl);
                    data[k].response = pdfUrl;
                    console.log(data[k].respnse);
            }
            
        }
        
        res.send(data);
    }
        
    
        
    };
}

module.exports = new GmailAPI();
