const axios = require("axios");

const apiList =
  "https://raw.githubusercontent.com/ZAKARIYA/JIYEM-API/refs/heads/main/JIYEM-API.json";

// ================= MAIN API =================
const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList);
    return res.data?.simsimi || null;
  } catch (e) {
    console.log("API ERROR:", e.message);
    return null;
  }
};

// ================= SAFE GLOBAL =================
global.client = global.client || {};
global.client.handleReply = global.client.handleReply || [];

// ================= CONFIG =================
module.exports.config = {
  name: "autoreplybot",
  version: "3.1.4",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Auto Reply + Simsimi Chat Bot",
  commandCategory: "chat",
  usePrefix: false,
  cooldowns: 0
};

// ================= GREETINGS =================
const greetings = [
  "জি জানু 😘",
  "ডাকছো কেনো বেবি 💖",
  "হুম বলো জান 🥺",
  "আমি আছি তোমার জন্য 😌",
  "কি করো জানু 😚",
  "Yes Baby 💕"
];

// ================= AUTO RESPONSES =================
const responses = {
  hi: "হাই জানু 😘",
  hello: "Hello Babu 💖",
  "good morning": "Good Morning 😚",
  "good night": "Good Night 🌙💤",
  "love you": "আমিও তোমাকে ভালোবাসি 😘",
  "miss you": "আমিও তোমাকে মিস করি 🥺",
  hmm: "হুম বলো জানু 😌",
  bot: "জি আমি আছি 😚",
  baby: "হুম জানু 💖",
  owner: "Owner : ZAKARIYA 😘",
  admin: "Admin হলো ZAKARIYA 😎",
  bye: "আবার আসবা কিন্তু 🥺",
  thanks: "Welcome 😘",
  "ki koro": "তোমার সাথে কথা বলতেছি 😌",
  pagol: "তুমিই পাগল 😹",
  "kiss me": "উফফ লজ্জা লাগে 🙈",
  single: "Single আছি কিন্তু মনের ভিতরে ১৪ crush 😩😂",
  crush: "Crush খাইয়া লাভ নাই 😹",
  gf: "GF লাগে? আগে shampoo দিয়া গোসল কর 😹🧼",
  bf: "BF না 🙂 PUBG খেলো 😹🎮",
  jaan: "এতো জান জান করো না 🙈💖",
  "mon kharap": "চা খাও 😌☕",
  ghum: "ঘুম আসে কিন্তু ফোন ছাড়তে পারি না 📱😩",
  busy: "Busy না 🙂 নাটক করতেছি 😹🎭",
  "taka de": "আমি গরিব 😭 তুমি দাও 💸"
};

// ================= EVENT =================
module.exports.handleEvent = async ({ api, event, Users }) => {
  try {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    const text = String(body).toLowerCase().trim();

    global.client.handleReply = global.client.handleReply || [];

    // ================= AUTO REPLY =================
    if (responses[text]) {
      return api.sendMessage(responses[text], threadID, messageID);
    }

    const base = await getMainAPI();
    if (!base) return;

    const senderName = await Users.getNameUser(senderID);

    // ================= GREETING =================
    if (["baby", "bot", "jan", "xan", "বেবি"].includes(text)) {
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(msg, threadID, messageID);
    }

    // ================= AI CHAT =================
    if (/^(baby|bot|jan|বেবি)\s+/i.test(text)) {
      const query = text.replace(/^(baby|bot|jan|বেবি)\s+/i, "").trim();
      if (!query) return;

      const url = `${base}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`;

      const res = await axios.get(url).catch(() => null);
      if (!res?.data?.response) return;

      const reply = Array.isArray(res.data.response)
        ? res.data.response[0]
        : res.data.response;

      return api.sendMessage(
        reply || "🙂 বুঝতে পারিনি",
        threadID,
        (err, info) => {
          if (!err && info?.messageID) {
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
    console.log("HANDLE EVENT ERROR:", e.message);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async ({ api, event, handleReply, Users }) => {
  try {
    if (!event.body || !handleReply) return;
    if (event.senderID !== handleReply.author) return;

    const text = event.body.trim();
    const base = await getMainAPI();
    if (!base) return;

    const senderName = await Users.getNameUser(event.senderID);

    const url = `${base}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)}`;

    const res = await axios.get(url).catch(() => null);
    if (!res?.data?.response) return;

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(
      reply || "🙂 পরে আবার বলো",
      event.threadID,
      (err, info) => {
        if (!err && info?.messageID) {
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
    console.log("HANDLE REPLY ERROR:", e.message);
  }
};

// ================= RUN =================
module.exports.run = async (o) => {
  return module.exports.handleEvent(o);
};
