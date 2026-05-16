
const axios = require("axios");

// ================= API =================
const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList);
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

  mon_kharap_amar: "চা খাও ☕ সব ঠিক হয়ে যাবে 😢",
  amar_keu_nai: "আমি আছি তো 😔💖",
  breakup: "সব ঠিক হয়ে যাবে 😢",
  kanna_korte_mon_cay: "কান্না করো না 😢",
  kosto_hocche: "ব্যথা কমে যাবে 💔",
  ami_eka_amar_keu_nei: "তুমি একা না 😔",

  joke: "তুমি নিজেই একটা joke 😹",
  lol: "হাহাহা 🤣",
  haha: "হাসতে থাকো 😆",
  tumi_boka: "তুমি নিজেই বোকা 🤡",
  idiot: "mirror দেখো আগে 😹",
  buddhi_nai_tomar: "brain update দাও 😹",
  porte_boso: "study না করলে fail 😹📚",
  exam: "exam = ভয় 😩",
  homework: "copy paste করো 😏",
  kiss: "আগে দাঁত ব্রাশ কর 😹🪥",
  ghumabo: "ঘুমাও 😴",
  cintay_achi: "চিন্তা করো না 😢",
  ajke_ami_onk_khusi: "কি হয়েছে বলো 😚💖",
  taka_deo_kicu: "আমার কাছে নাই 😭💸",
  khida_lagce: "বিরিয়ানি খাও 😋🍗",
  mod_khaico_nki: "না পানি খাইছি 😹",
  tomar_friend_k: "আমার best friend তুমি 😘",

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

    // AUTO RESPONSE
    if (responses[text]) {
      return api.sendMessage(responses[text], threadID, messageID);
    }

    // GREETING
    const greetWords = ["baby", "bot", "jan", "বেবি", "বট", "জান"];

    if (greetWords.includes(text)) {
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(msg, threadID, messageID);
    }

    // PREFIX CHECK
    const prefixRegex = /^(baby|bot|jan|বেবি|বট|জান)\s+/i;
    if (!prefixRegex.test(text)) return;

    const query = text.replace(prefixRegex, "").trim();
    if (!query) return;

    let senderName = "User";
    try {
      senderName = await Users.getNameUser(senderID);
    } catch {}

    const base = await getMainAPI();
    if (!base) {
      return api.sendMessage("❌ API অফলাইন", threadID, messageID);
    }

    const res = await axios
      .get(
        `${base}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`
      )
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage("🙂 পরে আবার বলো", threadID, messageID);
    }

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(reply, threadID, messageID);

  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async ({ api, event, Users, handleReply }) => {
  try {
    if (!event.body || !handleReply?.author) return;
    if (event.senderID !== handleReply.author) return;

    const text = event.body.trim();

    let senderName = "User";
    try {
      senderName = await Users.getNameUser(event.senderID);
    } catch {}

    const base = await getMainAPI();
    if (!base) {
      return api.sendMessage("❌ API অফলাইন", event.threadID, event.messageID);
    }

    const res = await axios
      .get(
        `${base}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)}`
      )
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage("🙂 পরে আবার বলো", event.threadID, event.messageID);
    }

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(reply, event.threadID, event.messageID);

  } catch (e) {
    console.log("REPLY ERROR:", e.message);
  }
};

// ================= RUN =================
module.exports.run = (o) => module.exports.handleEvent(o);
