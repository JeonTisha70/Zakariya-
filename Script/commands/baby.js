const axios = require("axios");

const apiList =
  "https://raw.githubusercontent.com/ZAKARIYA/JIYEM-API/refs/heads/main/JIYEM-API.json";

const getMainAPI = async () => {
  const data = await axios.get(apiList);
  return data.data.simsimi;
};

module.exports.config = {
  name: "autoreplybot",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "ZAKARIYA",
  description: "Auto reply with simsimi",
  commandCategory: "chat",
  usePrefix: false,
  cooldowns: 0
};

const responses = {
  "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
  "hello": "হ্যালো জানু 😘",
  "good morning": "GOOD MORNING 😚",
  "good night": "Sweet Dream 😴💖",
  "assalamualaikum": "ওয়ালাইকুমুস সালাম ❤️",
  "hmm": "Hmmm কিসের হুমম জানু 🥵",
  "love": "Love করলে সরাসরি জাকারিয়া বস কে বল 😻🔥",
  "i love you": "মেয়ে হলে বস জাকারিয়া এর ইনবক্সে যাও 😻",
  "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
  "thanks": "Welcome জানু 😘",
  "owner":
    "𝐎𝐖𝐍𝐄𝐑 ☞ ZAKARIYA JIYEM ☜\nFacebook: https://facebook.com/profile.php?id=61583600763759",
  "admin": "Admin হচ্ছে ZAKARIYA 😘",
  "ki kro": "তোমার কথা ভাবতেছি 😘",
  "pagol": "হুম পাগল 😹",
  "tui ke": "আমি জাকারিয়া বসের বট 😎",
  "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚💖"
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const { threadID, messageID, body, senderID } = event;

    if (!body) return;

    const msg = body.toLowerCase().trim();

    if (!responses[msg]) return;

    if (!global.client.handleReply)
      global.client.handleReply = [];

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
  } catch (e) {
    console.log(e);
  }
};

module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  try {
    if (event.senderID !== handleReply.author) return;

    const text = event.body;

    if (!text) return;

    const base = await getMainAPI();

    const link =
      `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    if (!res.data || !res.data.response) {
      return api.sendMessage(
        "🙂 পরে আবার বলো",
        event.threadID,
        event.messageID
      );
    }

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(
      reply,
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.log(err);

    return api.sendMessage(
      "🙂 API busy আছে পরে বলো",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
