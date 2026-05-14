const axios = require("axios");

const apiList =
  "https://raw.githubusercontent.com/ZAKARIYA/JIYEM-API/refs/heads/main/JIYEM-API.json";

// Main API Loader
const getMainAPI = async () => {
  const res = await axios.get(apiList);
  return res.data.simsimi;
};

// Config
module.exports.config = {
  name: "autoreplybot",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "ZAKARIYA",
  description: "Auto Reply Chat Bot",
  commandCategory: "chat",
  usePrefix: false,
  cooldowns: 0
};

// Auto Reply System
module.exports.handleEvent = async function ({
  api,
  event
}) {
  try {
    const { threadID, messageID, body, senderID } = event;

    if (!body) return;

    const msg = body.toLowerCase().trim();

    // Reply List
    const responses = {
      "hi": "হাই জানু 😘",
      "hello": "Hello Babu 💖",
      "good morning": "Good Morning 😚",
      "good night": "Good Night 🌙💤",
      "love you": "আমিও তোমাকে ভালোবাসি 😘",
      "i love you": "উম্মাহ 😘💋",
      "miss you": "আমিও তোমাকে মিস করি 🥺",
      "hmm": "হুম বলো জানু 😌",
      "bot": "বলো কি করতে পারি 😎",
      "baby": "হুম জানু 💖",
      "owner": "Owner : ZAKARIYA 😘",
      "admin": "Admin হলো ZAKARIYA 😎",
      "bye": "আবার আসবা কিন্তু 🥺",
      "thanks": "Welcome 😘",
      "ki koro": "তোমার সাথে কথা বলতেছি 😌",
      "pagol": "হুম তোমার জন্য পাগল 🤭",
      "kiss me": "উম্মাহ 😘",
      "valo aso": "আলহামদুলিল্লাহ ভালো আছি 🥰"
    };

    // Static Reply
    if (responses[msg]) {

      if (!global.client.handleReply) {
        global.client.handleReply = [];
      }

      return api.sendMessage(
        responses[msg],
        threadID,
        (err, info) => {
          if (err) return;

          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: senderID
          });
        },
        messageID
      );
    }

  } catch (err) {
    console.log(err);
  }
};

// Reply Continue System
module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  try {

    if (event.senderID !== handleReply.author) return;

    if (!event.body) return;

    const text = event.body.trim();

    const base = await getMainAPI();

    const link =
      `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    let reply = "🙂 বুঝতে পারলাম না";

    if (res.data && res.data.response) {
      reply = Array.isArray(res.data.response)
        ? res.data.response[0]
        : res.data.response;
    }

    if (!global.client.handleReply) {
      global.client.handleReply = [];
    }

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      },
      event.messageID
    );

  } catch (err) {

    return api.sendMessage(
      "🙂 একটু পরে আবার বলো",
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
    event
  });
};
