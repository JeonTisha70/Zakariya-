
const axios = require("axios");

// ================= API =================
const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList, { timeout: 5000 });
    return res?.data?.simsimi || null;
  } catch (e) {
    console.log("API ERROR:", e.message);
    return null;
  }
};

// ================= GLOBAL =================
global.client = global.client || {};
global.client.handleReply = global.client.handleReply || [];
global.handleReply = global.handleReply || []; // ✅ FIX IMPORTANT

// ================= CONFIG =================
module.exports.config = {
  name: "baby",
  version: "6.0.3",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Baby AI Chat Bot Ultra (Stable + Funny)",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// ================= GREETINGS =================
const greetings = [
  "হুম জানু বলো 😘",
  "কি খবর জান 😚",
  "ডাকছো কেনো 😏",
  "আমি আছি জান 💖",
  "বলো বেবি 😘"
];

// ================= AUTO RESPONSES =================
const responses = {
  hi: "হাই জান 😘💖",
  hello: "হ্যালো বেবি 😚",
  bye: "আবার আসবা জান 🥺💖",
  love: "আমি তোমাকে ভালোবাসি 😘💖",
  thanks: "ওয়েলকাম 😋",
  owner: "Owner 👉 ZAKARIYA",
  admin: "Admin 👉 ARIYAN 😎",
  hmm: "হুম 😵",
  busy: "হুমম একটু Busy 🙂",
  single: "আমিও, কিন্তু crush অনেক 😩😂",

  attitude: "আমি সবার জন্য না 😎🔥",
  boss: "Boss আমার জাকারিয়া 😏",
  king: "বস জাকারিয়া 👑",
  queen: "জাকারিয়ার বউ মানে আমার ভাবি 😌💖",
  smart: "আমি already smart 😎",
  ugly: "mirror দেখে আসো 😹",
  hero: "আমি নায়ক 😎🔥",
  legend: "তুমি আফার ভক্ত আমি জানি 😏",
  swag: "swag level max 😎🔥",
  angry: "রাগ করলে ভয় পাই না 😈",
  cool: "ঠান্ডা হওয়ার সময় নেই আয় মারামারি করি 😎",

  "mon kharap": "চা খাও ☕ সব ঠিক হয়ে যাবে 😢",
  "amar keu nei": "আমি আছি তো 😔💖",
  breakup: "পেরা নাই চিল আর একটা খুজে নিবো 😊",
  "betha kore": "অপেক্ষা করো ব্যথা কমে যাবে 💔",
  "kanna pacce": "কান্না করো না 😢",
  "miss u": "আমি আছি 😢💖",

  boka: "তুমি নিজেই একটা boka 😹",
  lol: "হাহাহা 🤣",
  haha: "হাসতে থাকো 😆",
  idiot: "mirror দেখো আগে 😹",
  bal: "বাল বাল করো কেন 🤡",
  "buddhi nai": "brain update দাও 😹",
  "porte boso": "study না করলে fail 😹📚",
  exam: "exam মানে ভয় 😩",
  homework: "copy paste করো 😏",
  kiss: "আগে দাঁত ব্রাশ কর 😹🪥",
  ghumabo: "ঘুমাও 😴 আমি পাহারা দিচ্ছি 😌",
  sad2: "চিন্তা করো না 😢",
  happy: "হ্যাপি থাকো 😚💖",
  taka: "আমার কাছে নাই 😭💸",
  khabo: "বিরিয়ানি খাও 😋🍗",
  drink: "পানি খাও 😹",
  friend: "আমি তোমার best friend 😘",

  ok: "ঠিক আছে 😌",
  no: "কেন না? 😹",
  yes: "ঠিক আছে 😎",
  wow: "ওহহ 😍",
  omg: "OMG 😳",
  sorry: "ঠিক আছে জান 😌💖",
  "love u": "Love you too 😘💖"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async ({ api, event, Users }) => {
  try {
    const { threadID, messageID, body, senderID } = event;
    if (!body || typeof body !== "string") return;

    const text = body.toLowerCase().trim();

    if (responses[text]) {
      return api.sendMessage(responses[text], threadID, messageID);
    }

    const greetWords = ["baby", "bot", "jan", "বেবি", "বট", "জান"];
    if (greetWords.some(w => text.includes(w))) {
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(msg, threadID, messageID);
    }

    const prefixRegex = /^(baby|bot|jan|বেবি|বট|জান)\b/i;
    if (!prefixRegex.test(text)) return;

    const query = text.replace(prefixRegex, "").trim();
    if (!query) return;

    const base = await getMainAPI();
    if (!base) {
      return api.sendMessage("❌ API অফলাইন", threadID, messageID);
    }

    const res = await axios.get(`${base}/simsimi?text=${encodeURIComponent(query)}`)
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage("🙂 পরে আবার বলো", threadID, messageID);
    }

    return api.sendMessage(res.data.response, threadID, messageID);

  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async ({ api, event, Users, handleReply }) => {
  try {
    if (!event.body || !handleReply?.author) return;
    if (event.senderID !== handleReply.author) return;

    const base = await getMainAPI();
    if (!base) return api.sendMessage("❌ API অফলাইন", event.threadID, event.messageID);

    const res = await axios.get(
      `${base}/simsimi?text=${encodeURIComponent(event.body)}`
    ).catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage("🙂 পরে আবার বলো", event.threadID, event.messageID);
    }

    return api.sendMessage(res.data.response, event.threadID, event.messageID);

  } catch (e) {
    console.log("REPLY ERROR:", e.message);
  }
};

// ================= RUN =================
module.exports.run = (o) => module.exports.handleEvent(o);
