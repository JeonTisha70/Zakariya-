
const axios = require("axios");

// ================= API LINK =================
const apiList =
  "https://raw.githubusercontent.com/ZAKARIYA/JIYEM-API/refs/heads/main/JIYEM-API.json";

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
  name: "autoreplybot",
  version: "3.1.6",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Auto Reply + Simsimi Chat Bot",
  commandCategory: "chat",
  usePrefix: false,
  cooldowns: 0
};

// ================= AUTO REPLIES =================
const responses = {
  hello: "Hello Babu 💖",
  "good morning": "Good Morning 😚",
  "good night": "Good Night 🌙💤",
  "love you": "আমিও তোমাকে ভালোবাসি 😘",
  "miss you": "আমিও তোমাকে মিস করি 🥺",
  hmm: "হুম বলো জানু 😌",
  owner: "Owner : ZAKARIYA 😘",
  admin: "Admin হলো ZAKARIYA 😎",
  bye: "আবার আসবা কিন্তু 🥺",
  thanks: "Welcome 😘",
  "ki koro": "তোমার সাথে কথা বলতেছি 😌",
  pagol: "তুমিই পাগল 😹",
  single: "Single আছি কিন্তু মনের ভিতরে ১৪ crush 😩😂",
  crush: "Crush খাইয়া লাভ নাই 😹",
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

    // ================= CHECK BODY =================
    if (!body || typeof body !== "string") return;

    const text = String(body).toLowerCase().trim();

    // ================= AUTO REPLY =================
    if (responses[text]) {
      return api.sendMessage(
        responses[text],
        threadID,
        null,
        messageID
      );
    }

    // ================= AI PREFIX CHECK =================
    const prefixRegex =
      /^(baby|bot|jan|বেবি)\s+/i;

    if (!prefixRegex.test(text)) return;

    // ================= GET QUERY =================
    const query = text
      .replace(prefixRegex, "")
      .trim();

    if (!query) return;

    // ================= GET API =================
    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API এখন কাজ করছে না",
        threadID,
        null,
        messageID
      );
    }

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      if (Users?.getNameUser) {
        senderName = await Users.getNameUser(senderID);
      }
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= API URL =================
    const url =
      `${base}/simsimi?text=${encodeURIComponent(
        query
      )}&senderName=${encodeURIComponent(senderName)}`;

    // ================= API REQUEST =================
    const res = await axios
      .get(url)
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage(
        "❌ কোনো response পাওয়া যায়নি",
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
      reply || "🙂 বুঝতে পারিনি",
      threadID,
      (err, info) => {
        if (err) {
          console.log("SEND ERROR:", err.message);
          return;
        }

        if (info?.messageID) {
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
    if (!event?.body) return;
    if (!handleReply?.author) return;

    // ================= AUTHOR CHECK =================
    if (event.senderID !== handleReply.author) return;

    const text = String(event.body).trim();

    if (!text) return;

    // ================= GET API =================
    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API এখন কাজ করছে না",
        event.threadID,
        null,
        event.messageID
      );
    }

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      if (Users?.getNameUser) {
        senderName = await Users.getNameUser(
          event.senderID
        );
      }
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= API URL =================
    const url =
      `${base}/simsimi?text=${encodeURIComponent(
        text
      )}&senderName=${encodeURIComponent(senderName)}`;

    // ================= API REQUEST =================
    const res = await axios
      .get(url)
      .catch(() => null);

    if (!res?.data?.response) {
      return api.sendMessage(
        "❌ কোনো response পাওয়া যায়নি",
        event.threadID,
        null,
        event.messageID
      );
    }

    // ================= GET REPLY =================
    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    // ================= SEND MESSAGE =================
    return api.sendMessage(
      reply || "🙂 পরে আবার বলো",
      event.threadID,
      (err, info) => {
        if (err) {
          console.log("SEND ERROR:", err.message);
          return;
        }

        if (info?.messageID) {
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
