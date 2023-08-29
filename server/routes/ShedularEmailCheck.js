const User = require("../model/User");
const bcrypt = require("bcrypt");
const Excel = require("../model/Excel");
const CronJob = require("cron").CronJob;

var gmail = require("./Gmail");

const print = async () => {
  const data = await Excel.find().exec();

  gmail.readInboxContent(data);
};

const handleShedular = new CronJob("0 * * * * *", function () {
  console.log("Running scheduler for per day.");
  print();
});

module.exports = { handleShedular };
