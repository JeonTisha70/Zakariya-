const axios = require("axios");

const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => {
  const res = await axios.get(apiList);
  return res.data.simsimi;
};

module.exports.config = {
  name: "baby",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ZAKARIYA",
  description: "Cute Baby Chat Bot",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// Random Reply List
const greetings = [
  "হুম জানু বলো 😘",
  "এতো ডাকো কেনো 🙈",
  "বলো কি করতে পারি তোমার জন্য 😌",
  "আমি বস জাকারিয়ার সাথে বিজি আছি 😏",
  "আরে জান বলো 😚",
  "তোমারে অনেক ভালোবাসি 🥰",
  "হুম শুনতেছি 😼",
  "ডাকছো কেনো জানু 🤭",
  "বলো বাবু 💖",
  "উম্মাহ 😘"
];

// Handle Event
module.exports.handleEvent = async function ({
  api,
  event,
  Users
}) {
  try {
    const { threadID, messageID, senderID, body } = event;

    if (!body) return;

    const raw = body.toLowerCase().trim();

    if (!global.client.handleReply)
      global.client.handleReply = [];

    const senderName = await Users.getNameUser(senderID);

    const simsim = await getMainAPI();

    // Single Call Replies
    if (
      raw === "baby" ||
      raw === "bot" ||
      raw === "bby" ||
      raw === "jan" ||
      raw === "xan" ||
      raw === "বেবি" ||
      raw === "জান" ||
      raw === "বট"
    ) {
      const msg =
        greetings[Math.floor(Math.random() * greetings.length)];

      return api.sendMessage(
        msg,
        threadID,
        (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: senderID
            });
          }
        },
        messageID
      );
    }

    // Prefix Chat
    if (
      raw.startsWith("baby ") ||
      raw.startsWith("bot ") ||
      raw.startsWith("bby ") ||
      raw.startsWith("jan ") ||
      raw.startsWith("xan ") ||
      raw.startsWith("বেবি ") ||
      raw.startsWith("বট ") ||
      raw.startsWith("জান ")
    ) {
      const query = raw.replace(
        /^(baby|bot|bby|jan|xan|বেবি|বট|জান)\s+/i,
        ""
      );

      if (!query) return;

      const res = await axios.get(
        `${simsim}/simsimi?text=${encodeURIComponent(
          query
        )}&senderName=${encodeURIComponent(senderName)}`
      );

      const reply = Array.isArray(res.data.response)
        ? res.data.response[0]
        : res.data.response;

      return api.sendMessage(
        reply,
        threadID,
        (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: senderID
            });
          }
        },
        messageID
      );
    }
  } catch (e) {
    console.log(e);
  }
};

// Handle Reply
module.exports.handleReply = async function ({
  api,
  event,
  Users,
  handleReply
}) {
  try {
    if (event.senderID !== handleReply.author) return;

    const senderName = await Users.getNameUser(
      event.senderID
    );

    const text = event.body;

    if (!text) return;

    const simsim = await getMainAPI();

    const res = await axios.get(
      `${simsim}/simsimi?text=${encodeURIComponent(
        text
      )}&senderName=${encodeURIComponent(senderName)}`
    );

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID
          });
        }
      },
      event.messageID
    );
  } catch (e) {
    return api.sendMessage(
      "🙂 পরে আবার বলো",
      event.threadID,
      event.messageID
    );
  }
};

// Run Command
module.exports.run = async function ({
  api,
  event
}) {
  return module.exports.handleEvent({
    api,
    event,
    Users: global.Users
  });
};
