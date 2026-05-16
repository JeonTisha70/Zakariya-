
const axios = require("axios");

// ================= API LINK =================
const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

// ================= GET MAIN API =================
const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList);

    if (!res?.data?.simsimi) {
      console.log("SIMSIMI API NOT FOUND");
      return null;
    }

    return res.data.simsimi;
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
  name: "baby",
  version: "4.0.9",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Cute Baby Chat Bot",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// ================= AUTO RESPONSES =================
const responses = {
  hi: "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
  hello: "হ্যালো জানু 😚 কি খবর তোমার?",
  "good morning": "GOOD MORNING 🌞 দাঁত ব্রাশ করে নাস্তা করে নাও 😚",
  "good night": "Sweet Dream babu… 😏💤",
  bye: "কই যাস 😒 আমাকে রেখে যাস না 🌚",
  by: "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাস..!🌚🌶️",
  বাই: "আবার আসবা কিন্তু 🥺💖",
  "miss you": "আমিও তোমাকে মিস করি 🥺",
  "love you": "আমিও তোমাকে ভালোবাসি 😘💖",
  thanks: "এতো ধন্যবাদ না দিয়ে একটা বিরিয়ানি খাওয়াও 😋🍗",
  owner: "𝐎𝐖𝐍𝐄𝐑 ☞ ZAKARIYA ☜",
  admin: "Admin হলো ZAKARIYA 😘",
  jaan: "এতো জান জান করো না 🙈💖",
  babu: "হুম বাবু বলো 😚",
  pagol: "হুম 🙂 তোমার জন্যই পাগল 😹",
  single: "Single আছি কিন্তু মনের ভিতরে ১৪ টা crush 😩😂",
  crush: "Crush খাইয়া লাভ নাই 😹",
  gf: "GF লাগে? আগে shampoo দিয়া গোসল কর 😹🧼",
  bf: "BF না 🙂 PUBG খেলো 😹🎮",
  busy: "Busy না 🙂 নাটক করতেছি 😹🎭",
  "ki koro": "তোমারে reply দিতেছি জানু 📱😘",
  ghum: "ঘুমাইতে যাই কিন্তু ফোন নামাতে পারি না 😩📱",
  "mon kharap": "মন খারাপ কইরো না 🙂 চা খাও ☕",
  "taka de": "আমিই গরিব 😭 উল্টা তুমি টাকা দাও 💸",
  hmm: "Hmmm কিসের হুমম জানু 🥵"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async ({
  api,
  event,
  Users
}) => {
  try {
    const { threadID, messageID, senderID, body } = event;

    if (!body || typeof body !== "string") return;

    const raw = String(body).toLowerCase().trim();

    // ================= AUTO REPLY =================
    if (responses[raw]) {
      return api.sendMessage(
        responses[raw],
        threadID,
        null,
        messageID
      );
    }

    // ================= AI PREFIX =================
    const prefixRegex =
      /^(baby|bot|bby|jan|xan|বেবি|বট|জান)\s+/i;

    if (!prefixRegex.test(raw)) return;

    const query = raw.replace(prefixRegex, "").trim();

    if (!query) return;

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      if (Users?.getNameUser) {
        senderName = await Users.getNameUser(senderID);
      }
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= GET API =================
    const simsim = await getMainAPI();

    if (!simsim) {
      return api.sendMessage(
        "🙂 API এখন অফলাইন",
        threadID,
        null,
        messageID
      );
    }

    // ================= API REQUEST =================
    const res = await axios
      .get(
        `${simsim}/simsimi?text=${encodeURIComponent(
          query
        )}&senderName=${encodeURIComponent(senderName)}`
      )
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage(
        "🙂 পরে আবার বলো",
        threadID,
        null,
        messageID
      );
    }

    // ================= GET REPLY =================
    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    // ================= SEND MESSAGE =================
    return api.sendMessage(
      reply || "🙂 বুঝতে পারলাম না",
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
  } catch (e) {
    console.log("HANDLE EVENT ERROR:", e.message);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async ({
  api,
  event,
  Users,
  handleReply
}) => {
  try {
    if (!event?.body) return;
    if (!handleReply?.author) return;
    if (event.senderID !== handleReply.author) return;

    const text = String(event.body).trim();

    if (!text) return;

    let senderName = "User";

    try {
      if (Users?.getNameUser) {
        senderName = await Users.getNameUser(event.senderID);
      }
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    const simsim = await getMainAPI();

    if (!simsim) {
      return api.sendMessage(
        "🙂 API এখন অফলাইন",
        event.threadID,
        null,
        event.messageID
      );
    }

    const res = await axios
      .get(
        `${simsim}/simsimi?text=${encodeURIComponent(
          text
        )}&senderName=${encodeURIComponent(senderName)}`
      )
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage(
        "🙂 পরে আবার বলো",
        event.threadID,
        null,
        event.messageID
      );
    }

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
module.exports.run = async (obj) => {
  return module.exports.handleEvent(obj);
};
