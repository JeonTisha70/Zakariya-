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

// 🔥 DOUBLE REPLY STOP MEMORY
global.__baby_last_msg = global.__baby_last_msg || "";

// ================= CONFIG =================
module.exports.config = {
  name: "baby",
  version: "6.0.4",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Baby AI Chat Bot Ultra (Stable + No Duplicate Reply)",
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
  Hi: "হাই জান 😘💖",
  Hello: "হ্যালো বেবি 😚",
  Bye: "আবার আসবা জান 🥺💖",
  Love: "আমি তোমাকে ভালোবাসি 😘💖",
  Thanks: "ওয়েলকাম 😋",
  Owner: "Owner 👉 ZAKARIYA",
  Admin: "Admin 👉 ARIYAN 😎",
  Hmm: "হুম 😵",
  Busy: "হুমম একটু Busy 🙂",
  Single: "আমিও, কিন্তু crush অনেক 😩😂",

  Attitude: "আমি সবার জন্য না 😎🔥",
  Boss: "Boss আমার জাকারিয়া 😏",
  King: "বস জাকারিয়া 👑",
  Queen: "জাকারিয়ার বউ মানে আমার ভাবি 😌💖",
  Smart: "আমি already smart 😎",
  Ugly: "mirror দেখে আসো 😹",
  Hero: "আমি নায়ক 😎🔥",
  Legend: "তুমি আফার ভক্ত আমি জানি 😏",
  Swag: "swag level max 😎🔥",
  Angry: "রাগ করলে ভয় পাই না 😈",
  Cool: "ঠান্ডা হওয়ার সময় নেই আয় মারামারি করি 😎",

  "Mon kharap": "চা খাও ☕ সব ঠিক হয়ে যাবে 😢",
  "Amar keu nei": "আমি আছি তো 😔💖",
  Breakup: "পেরা নাই চিল আর একটা খুজে নিবো 😊",
  "Betha kore": "অপেক্ষা করো ব্যথা কমে যাবে 💔",
  "Kanna pacce": "কান্না করো না 😢",
  "Miss u": "আমি আছি 😢💖",

  Boka: "তুমি নিজেই একটা boka 😹",
  Lol: "হাহাহা 🤣",
  Haha: "হাসতে থাকো 😆",
  Idiot: "mirror দেখো আগে 😹",
  Bal: "বাল বাল করো কেন 🤡",
  "Buddhi nai": "brain update দাও 😹",
  "Porte boso": "study না করলে fail 😹📚",
  Exam: "exam মানে ভয় 😩",
  Homework: "copy paste করো 😏",
  Kiss: "আগে দাঁত ব্রাশ কর 😹🪥",
  Ghumabo: "ঘুমাও 😴 আমি পাহারা দিচ্ছি 😌",
  Sad2: "চিন্তা করো না 😢",
  Happy: "হ্যাপি থাকো 😚💖",
  Taka: "আমার কাছে নাই 😭💸",
  Khabo: "বিরিয়ানি খাও 😋🍗",
  Drink: "পানি খাও 😹",
  Friend: "আমি তোমার best friend 😘",

  Ok: "ঠিক আছে 😌",
  No: "কেন না? 😹",
  Yes: "ঠিক আছে 😎",
  Wow: "ওহহ 😍",
  Omg: "OMG 😳",
  Sorry: "ঠিক আছে জান 😌💖",
  "Love u": "Love you too 😘💖"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async ({ api, event, Users }) => {
  try {
    const { threadID, messageID, body } = event;
    if (!body || typeof body !== "string") return;

    const text = body.toLowerCase().trim();

    // 🔥 DOUBLE REPLY BLOCK
    const uniqueKey = threadID + "_" + messageID;
    if (global.__baby_last_msg === uniqueKey) return;
    global.__baby_last_msg = uniqueKey;

    // AUTO RESPONSE
    if (responses[text]) {
      return api.sendMessage(responses[text], threadID, messageID);
    }

    // GREETING
    const greetWords = ["baby", "bot", "jan", "বেবি", "বট", "জান"];
    if (greetWords.some(w => text.includes(w))) {
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(msg, threadID, messageID);
    }

    // PREFIX
    const prefixRegex = /^(baby|bot|jan|বেবি|বট|জান)\b/i;
    if (!prefixRegex.test(text)) return;

    const query = text.replace(prefixRegex, "").trim();
    if (!query) return;

    const base = await getMainAPI();
    if (!base) {
      return api.sendMessage("❌ API অফলাইন", threadID, messageID);
    }

    const res = await axios
      .get(`${base}/simsimi?text=${encodeURIComponent(query)}`)
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
