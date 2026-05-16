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
  version: "4.0.7",
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
  "miss you": "আরেক বেডারে Miss না করে xan মেয়ে হলে বস জাকারিয়া রে হাঙ্গা করো 😶👻😘",
  "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু জাকারিয়া বস বেশি করে 😏💖",
  "love you": "আমিও তোমাকে ভালোবাসি 😘💖",
  "লাভ ইউ": "আমিও তোমাকে ভালোবাসি 😘💖",
  "i love you": "Love করলে সরাসরি জাকারিয়া বস কে বল জানু 😻🔥",
  love: "Love করলে আগে recharge দাও 😹📲",
  valobashi: "ভালোবাসা দিয়া কি হবে 🙂 recharge দাও 😹📲",
  "kiss me": "তুমি পঁচা 😒 তোমাকে কিস দিবো না 🤭",
  "kiss de": "কিস দিস না 😒 আগে দাঁত ব্রাশ করে আয় 🤬🪥",
  ummmah: "এতো Ummmah কেনো জানু… কিছু বলবা? 😉",
  thanks: "এতো ধন্যবাদ না দিয়ে একটা বিরিয়ানি খাওয়াও 😋🍗",
  owner: "𝐎𝐖𝐍𝐄𝐑 ☞ ZAKARIYA JIYEM ☜",
  admin: "He is ZAKARIYA 😘 সবাই Admin ARIYAN নামে চিনে ☺️",
  jaan: "এতো জান জান করো না 🙈💖",
  babu: "হুম বাবু বলো 😚",
  pagol: "হুম 🙂 তোমার জন্যই পাগল 😹",
  pagli: "পাগলি না 🙂 limited edition 😌✨",
  single: "Single আছি কিন্তু মনের ভিতরে ১৪ টা crush 😩😂",
  crush: "Crush খাইয়া লাভ নাই 😹 reply দিবে না 💔",
  gf: "GF লাগে? আগে shampoo দিয়া গোসল কর 😹🧼",
  bf: "BF না 🙂 PUBG খেলো 😹🎮",
  busy: "Busy না 🙂 নাটক করতেছি 😹🎭",
  "online aso": "হুম 🙂 data শেষ হওয়ার আগ পর্যন্ত 😹📶",
  "কি করো": "তোমার সাথে কথা বলতেছি 😌💖",
  "ki koro": "তোমারে reply দিতেছি জানু 📱😘",
  "ki kro": "তোমারে reply দিতেছি 😌📱",
  খাইছো: "হুম খাইছি 😋 তুমি খাইছো?",
  khaiso: "না জানু 🙂 তোমার অপেক্ষায় আছি 🍽️😹",
  খাবি: "খাওয়াইবা? 😋 আমি কিন্তু বিরিয়ানি খাই 🍗",
  khabi: "খাওয়াইবা? 😋 আমি কিন্তু বিরিয়ানি খাই 🍗",
  "তোমার নাম কি": "আমার নাম সিনথিয়া 💖",
  "tomar nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚 😘",
  "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚 💖",
  "বাসা কোথায়": "তোমার মনের ভিতরে থাকি 😌🏠",
  "basa kothay": "তোমার হৃদয়ে থাকি 💘",
  "তুমি কে": "আমি তোমার favourite bot 😌💖",
  "tumi ke": "আমি cute baby bot 😚",
  "ভালো আছো তো": "আলহামদুলিল্লাহ ভালো আছি 🥰",
  "valo aso": "হুম ভালো আছি জানু 😘",
  ghum: "ঘুমাইতে যাই কিন্তু ফোন নামাতে পারি না 😩📱",
  "mon kharap": "মন খারাপ কইরো না 🙂 চা খাও সব ঠিক 😌☕",
  "taka de": "আমিই গরিব 😭 উল্টা তুমি টাকা দাও 💸",
  "amar keu nai": "আমি আছি তো 😌✨",
  "tmi cute": "জানি 😌 আয়নায় রোজ দেখি 😹🪞",
  assalamualaikum: "ওয়ালাইকুমুস সালাম ❤️‍🩹",
  "eid mobarak": "ঈদ মোবারক 🌙✨ সেমাই খাইতে ভুলবা না 😋",
  jakariya: "উনি এখন কাজে বিজি আছে 😘 কি বলবেন আমাকে বলতে পারেন..!",
  "ami zakariya": "হ্যা বস 😎 কেমন আছেন..?☺️",
  breakup: "চিন্তা করিস না 😎 নতুন জন পাইয়া যাবি 🔥",
  hmm: "Hmmm কিসের হুমম জানু 🥵",
  "rag korso": "রাগ করি নাই 🙂 শুধু block দেওয়ার চিন্তা করতেছি 😹",
  "tmi koi": "আমি তোমার মনের ভিতরে আছি 😌💘",
  "love korba": "আগে friendship 🙂 তারপর দেখা যাবে 😹💖",
  tired: "Life এ tired 🙂 কিন্তু online এ active 😹📱"
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

    // ================= GREETING =================
    const greetWords = [
      "baby",
      "bot",
      "bby",
      "jan",
      "xan",
      "বেবি",
      "জান",
      "বট"
    ];

    if (greetWords.includes(raw)) {
      const msg =
        greetings[Math.floor(Math.random() * greetings.length)];

      return api.sendMessage(
        msg,
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

    // ================= GET USER NAME =================
    let senderName = "User";

    try {
      if (Users?.getNameUser) {
        senderName = await Users.getNameUser(event.senderID);
      }
    } catch (e) {
      console.log("NAME ERROR:", e.message);
    }

    // ================= GET API =================
    const simsim = await getMainAPI();

    if (!simsim) {
      return api.sendMessage(
        "🙂 API এখন অফলাইন",
        event.threadID,
        null,
        event.messageID
      );
    }

    // ================= API REQUEST =================
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

    // ================= GET REPLY =================
    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    // ================= SEND MESSAGE =================
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
