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

// ================= CONFIG =================
module.exports.config = {
  name: "baby",
  version: "6.0.1",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Baby AI Chat Bot Ultra (Fixed Stable)",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// ================= GREETINGS =================
const greetings = ["হুম জানু বলো 😘"];

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
  king: "আমি এই বট দুনিয়ার রাজা 👑",
  queen: "রানী হলে তুমি 😌💖",
  smart: "আমি already smart 😎",
  ugly: "mirror দেখে আসো 😹",
  hero: "আমি নায়ক 😎🔥",
  legend: "legend explain করে না 😏",
  swag: "swag level max 😎🔥",
  angry: "রাগ করলে ভয় পাও 😈",
  cool: "আমি cool 😎",

  ok: "ঠিক আছে 😌",
  no: "কেন না? 😹",
  yes: "ঠিক আছে 😎",
  wow: "ওহহ 😍",
  omg: "OMG 😳",
  sorry: "ঠিক আছে জান 😌💖"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async ({ api, event, Users }) => {
  try {
    const { threadID, messageID, senderID, body } = event;

    if (!body || typeof body !== "string") return;

    const text = body.toLowerCase().trim();

    // AUTO RESPONSE (SAFE)
    if (responses[text]) {
      return api.sendMessage(responses[text], threadID, messageID);
    }

    // GREETING FIX (partial match)
    const greetWords = ["baby", "bot", "jan", "বেবি", "বট", "জান"];
    if (greetWords.some(w => text.includes(w))) {
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(msg, threadID, messageID);
    }

    // PREFIX CHECK FIX
    const prefixRegex = /^(baby|bot|jan|বেবি|বট|জান)\b/i;
    if (!prefixRegex.test(text)) return;

    const query = text.replace(prefixRegex, "").trim();
    if (!query) return;

    const base = await getMainAPI();
    if (!base) {
      return api.sendMessage("❌ API অফলাইন", threadID, messageID);
    }

    const res = await axios.get(
      `${base}/simsimi?text=${encodeURIComponent(query)}`
    ).catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage("🙂 পরে আবার বলো", threadID, messageID);
    }

    return api.sendMessage(res.data.response, threadID, messageID);

  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

// ================= RUN FIX =================
module.exports.run = (o) => module.exports.handleEvent(o);
