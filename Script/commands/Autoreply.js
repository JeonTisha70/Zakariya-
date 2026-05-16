
const axios = require("axios");

// ================= API LINK =================
const apiList =
  "https://raw.githubusercontent.com/ZAKARIYA/JIYEM-API/refs/heads/main/JIYEM-API.json";

// ================= GET MAIN API =================
const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList);

    if (!res.data || !res.data.simsimi) {
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
if (!global.client) global.client = {};
if (!global.client.handleReply) global.client.handleReply = [];

// ================= CONFIG =================
module.exports.config = {
  name: "autoreplybot",
  version: "3.1.5",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Auto Reply + Simsimi Chat Bot",
  commandCategory: "chat",
  usePrefix: false,
  cooldowns: 0
};

// ================= AUTO REPLIES =================
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
  single: "Single আছি কিন্তু মনের ভিতরে ১৪ crush 😩😂",
  crush: "Crush খাইয়া লাভ নাই 😹",
  jaan: "এতো জান জান করো না 🙈💖",
  "mon kharap": "চা খাও 😌☕",
  ghum: "ঘুম আসে কিন্তু ফোন ছাড়তে পারি না 📱😩",
  busy: "Busy না 🙂 নাটক করতেছি 😹🎭",
  "taka de": "আমি গরিব 😭 তুমি দাও 💸"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async function ({
  api,
  event,
  Users
}) {
  try {
    const { threadID, messageID, body, senderID } = event;

    // যদি message না থাকে
    if (!body || typeof body !== "string") return;

    const text = body.toLowerCase().trim();

    // ================= AUTO REPLY =================
    if (responses[text]) {
      return api.sendMessage(
        responses[text],
        threadID,
        messageID
      );
    }

    // ================= AI PREFIX CHECK =================
    const prefixRegex = /^(baby|bot|jan|বেবি)\s+/i;

    if (!prefixRegex.test(text)) return;

    // ================= GET QUERY =================
    const query = text.replace(prefixRegex, "").trim();

    if (!query) return;

    // ================= GET API =================
    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API এখন কাজ করছে না",
        threadID,
        messageID
      );
    }

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      senderName = await Users.getNameUser(senderID);
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= API URL =================
    const url = `${base}/simsimi?text=${encodeURIComponent(
      query
    )}&senderName=${encodeURIComponent(senderName)}`;

    // ================= API REQUEST =================
    const res = await axios.get(url).catch(() => null);

    if (!res || !res.data) {
      return api.sendMessage(
        "❌ কোনো response পাওয়া যায়নি",
        threadID,
        messageID
      );
    }

    // ================= GET REPLY =================
    let reply;

    if (Array.isArray(res.data.response)) {
      reply = res.data.response[0];
    } else {
      reply = res.data.response;
    }

    // ================= SEND MESSAGE =================
    return api.sendMessage(
      reply || "🙂 বুঝতে পারিনি",
      threadID,
      (err, info) => {
        if (err) {
          console.log("SEND ERROR:", err.message);
          return;
        }

        if (info && info.messageID) {
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
module.exports.handleReply = async function ({
  api,
  event,
  handleReply,
  Users
}) {
  try {
    if (!event.body || !handleReply) return;

    // শুধু যে user শুরু করেছে সে reply দিতে পারবে
    if (event.senderID !== handleReply.author) return;

    const text = event.body.trim();

    if (!text) return;

    // ================= GET API =================
    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API এখন কাজ করছে না",
        event.threadID,
        event.messageID
      );
    }

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      senderName = await Users.getNameUser(event.senderID);
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= API URL =================
    const url = `${base}/simsimi?text=${encodeURIComponent(
      text
    )}&senderName=${encodeURIComponent(senderName)}`;

    // ================= API REQUEST =================
    const res = await axios.get(url).catch(() => null);

    if (!res || !res.data) {
      return api.sendMessage(
        "❌ কোনো response পাওয়া যায়নি",
        event.threadID,
        event.messageID
      );
    }

    // ================= GET REPLY =================
    let reply;

    if (Array.isArray(res.data.response)) {
      reply = res.data.response[0];
    } else {
      reply = res.data.response;
    }

    // ================= SEND MESSAGE =================
    return api.sendMessage(
      reply || "🙂 পরে আবার বলো",
      event.threadID,
      (err, info) => {
        if (err) {
          console.log("SEND ERROR:", err.message);
          return;
        }

        if (info && info.messageID) {
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
module.exports.run = async function (obj) {
  return module.exports.handleEvent(obj);
};
