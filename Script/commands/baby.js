const axios = require("axios");

const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

// ================= MAIN API =================
const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList);
    return res.data.simsimi;
  } catch (e) {
    console.log("API ERROR:", e.message);
    return null;
  }
};

// ================= CONFIG =================
module.exports.config = {
  name: "baby",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "ZAKARIYA",
  description: "Cute Baby Chat Bot",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// ================= RANDOM GREETINGS =================
const greetings = [
  "হুম জানু বলো 😘",
  "এতো ডাকো কেনো 🙈",
  "বলো কি করতে পারি তোমার জন্য 😌",
  "আমি বস জাকারিয়ার সাথে বিজি আছি 😏",
  "আরে জান বলো 😚",
  "তোমারে অনেক ভালোবাসি 🥰",
  "হুম শুনতেছি 😼",
  "ডাকছো কেনো জানু 🤭",
  "বলো বাবু 💖",
  "উম্মাহ 😘"
];

// ================= AUTO REPLIES =================
const responses = {

  "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
  "hello": "হ্যালো জানু 😚 কি খবর তোমার?",
  "good morning": "GOOD MORNING 🌞 দাঁত ব্রাশ করে নাস্তা করে নাও 😚",
  "good night": "Sweet Dream babu… 😏💤",
  "bye": "কই যাস 😒 আমাকে রেখে যাস না 🌚",
  "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাস..!🌚🌶️",

  "miss you": "আরেক বেডারে Miss না করে xan মেয়ে হলে বস জাকারিয়া রে হাঙ্গা করো😶👻😘",
  "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু জাকারিয়া বস বেশি করে 😏💖",

  "love you": "Love you too 😚",
  "i love you": "Love করলে সরাসরি জাকারিয়া বস কে বল জানু 😻🔥",
  "love": "Love করলে আগে recharge দাও 😹📲",
  "valobashi": "ভালোবাসা দিয়া কি হবে 🙂 recharge দাও 😹📲",

  "kiss me": "তুমি পঁচা 😒 তোমাকে কিস দিবো না 🤭",
  "kiss de": "কিস দিস না 😒 আগে দাঁত ব্রাশ করে আয় 🤬🪥",
  "ummmah": "এতো Ummmah কেনো জানু… কিছু বলবা? 😉",

  "thanks": "এতো ধন্যবাদ না দিয়ে একটা বিরিয়ানি খাওয়াও 😋🍗",

  "owner": "𝐎𝐖𝐍𝐄𝐑 ☞ ZAKARIYA JIYEM ☜",
  "admin": "He is ZAKARIYA 😘 সবাই Admin ARIYAN নামে চিনে ☺️",

  "bot": "বলো কি করতে পারি 😎",
  "baby": "হুম জানু 💖",
  "janu": "হুম জানু বলো 😚💖",
  "babu": "হুম বাবু বলো 😚",

  "pagol": "হুম 🙂 তোমার জন্যই পাগল 😹",
  "pagli": "পাগলি না 🙂 limited edition 😌✨",

  "single": "Single আছি কিন্তু মনের ভিতরে ১৪ টা crush 😩😂",
  "crush": "Crush খাইয়া লাভ নাই 😹 reply দিবে না 💔",

  "gf": "GF লাগে? আগে shampoo দিয়া গোসল কর 😹🧼",
  "bf": "BF না 🙂 PUBG খেলো 😹🎮",

  "busy": "Busy না 🙂 নাটক করতেছি 😹🎭",
  "online aso": "হুম 🙂 data শেষ হওয়ার আগ পর্যন্ত 😹📶",

  "কি করো": "তোমার সাথে কথা বলতেছি 😌💖",
  "ki koro": "তোমারে reply দিতেছি জানু 📱😘",
  "ki kro": "তোমারে reply দিতেছি 😌📱",

  "খাইছো": "হুম 😋 একটু আগে খাইলাম",
  "khaiso": "না জানু 🙂 তোমার অপেক্ষায় আছি 🍽️😹",

  "খাবি": "খাওয়াইবা? 😋 আমি কিন্তু বিরিয়ানি খাই 🍗",
  "khabi": "খাওয়াইবা? 😋 আমি কিন্তু বিরিয়ানি খাই 🍗",

  "নাম কি": "আমার নাম সিনথিয়া 💖",
  "nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚 😘",
  "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚 💖",

  "বাসা কোথায়": "তোমার মনের ভিতরে থাকি 😌🏠",
  "basa kothay": "ঢাকা না 🙂 তোমার হৃদয়ে থাকি 💘",

  "তুমি ছোট না বড়": "আমি cute 🙂 বয়স জিজ্ঞেস করা নিষেধ 😹",
  "boro na choto": "আমি ছোট্ট একটা cute bot 😌✨",

  "ফ্যামিলিতে কতোজন": "আমরা অনেকজন 😹 পুরো bot family",
  "family koyjon": "অনেক 😹 গুনে শেষ করা যাবে না",

  "কোন ক্লাসে পড়": "আমি স্কুলে না 🙂 online এ পড়ি 😹📚",
  "kon class": "Bot দের আবার class লাগে নাকি 😹",

  "তুমি কে": "আমি তোমার favourite bot 😌💖",
  "tmi ke": "আমি cute baby bot 😚",
  "tui ke": "আমি তোর favourite bot 😏",

  "ভালো আছো": "আলহামদুলিল্লাহ ভালো আছি 🥰",
  "valo aso": "হুম ভালো আছি জানু 😘",
  "valo aco": "হ্যাঁ রে প্রিও 😌 ভালো আছি 💞",

  "ঘুমাইছো": "না 🙂 তোমার সাথে কথা বলতেছি 😹",
  "ghumaiso": "ঘুম আসে কিন্তু ফোন ছাড়তে পারি না 📱😩",
  "ghum": "ঘুমাইতে যাই কিন্তু ফোন নামাতে পারি না 😩📱",

  "mon kharap": "মন খারাপ কইরো না 🙂 চা খাও সব ঠিক 😌☕",

  "taka de": "আমিই গরিব 😭 উল্টা তুমি টাকা দাও 💸",

  "amar keu nai": "আমি আছি তো 😌✨",

  "tmi cute": "জানি 😌 আয়নায় রোজ দেখি 😹🪞",

  "haso keno": "তোমারে দেখলেই হাসি পায় 😹",

  "misti": "এতো মিষ্টি কথা বলো কেন 🍭😹",

  "assalamualaikum": "ওয়ালাইকুমুস সালাম ❤️‍🩹",

  "eid mobarak": "ঈদ মোবারক 🌙✨ সেমাই খাইতে ভুলবা না 😋"

  "miss you": "আরেক বেডারে Miss না করে xan মেয়ে হলে বস জাকারিয়া রে হাঙ্গা করো😶👻😘",

  "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু জাকারিয়া বস বেশি করে 😏💖",

  "kiss de": "কিস দিস না 😒 আগে দাঁত ব্রাশ করে আয় 🤬🪥",

  "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",

  "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",

  "hello": "হ্যালো জানু 😚 কি খবর তোমার?",

  "bc": "SAME TO YOU 😊",

  "pro": "হুমম তোমার বান্ধবী চোশমা ওয়ালি 😂",

  "good morning": "GOOD MORNING 🌞 দাঁত ব্রাশ করে নাস্তা করে নাও 😚",

  "good night": "Sweet Dream babu… 😏💤",

  "tor ball": "~ এখনো সময় আছে ভালো হয়ে যাও 🤧🤖",

  "jakariya": "উনি এখন কাজে বিজি আছে 😘 কি বলবেন আমাকে বলতে পারেন..!",

  "owner": "𝐎𝐖𝐍𝐄𝐑 ☞ ZAKARIYA JIYEM ☜\nFacebook: https://www.facebook.com/profile.php?id=61583600763759\nWhatsApp: +8801908488295",

  "admin": "He is ZAKARIYA 😘 সবাই Admin ARIYAN নামে চিনে ☺️",

  "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে 😍",

  "chup": "তুই চুপ কর পাগল ছাগল 😒",

  "assalamualaikum": "ওয়ালাইকুমুস সালাম ❤️‍🩹",

  "fork": "https://github.com/Zakariya-jiyem/ZAKARIYA-CHAT-BOT.git",

  "kiss me": "তুমি পঁচা 😒 তোমাকে কিস দিবো না 🤭",

  "thanks": "এতো ধন্যবাদ না দিয়ে একটা বিরিয়ানি খাওয়াও 😋🍗",

  "i love you": "Love করলে সরাসরি জাকারিয়া বস কে বল জানু 😻🔥",

  "love you": "Love you too 😚",

  "bye": "কই যাস 😒 আমাকে রেখে যাস না 🌚",

  "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাস..!🌚🌶️",

  "ami zakariya": "হ্যা বস 😎 কেমন আছেন..?☺️",

  "bot er baccha": "আমার বাচ্চা তো PUBG খেলতেছে 😹🎮",

  "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐲𝐚 💖",

  "pic de": "এন থেকে সর দূরে গিয়া মর 😒",

  "cudi": "কিছু কইলাম না 🙂 ভালো হয়ে গেছি আমি 🥱🌚",

  "bal": "রাগ করে না সোনা পাখি 🥰",

  "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",

  "boda": "ভাই তুই এত হাসিস না..!🌚🤣",

  "kire ki kro": "তোমার কথা ভাবতেছি জানু 😚",

  "ki kro": "তোমারে reply দিতেছি 😌📱",

  "kire bot": "হ্যাঁ বলো জানু 😘😽",

  "valo aco": "হ্যাঁ রে প্রিও 😌 ভালো আছি 💞",

  "pagol": "হুম 🙂 তোমার জন্যই পাগল 😹",

  "breakup": "চিন্তা করিস না 😎 নতুন জন পাইয়া যাবি 🔥",

  "tui ke": "আমি তোর favourite bot 😏",

  "ummmah": "এতো Ummmah কেনো জানু… কিছু বলবা? 😉",

  "hmm": "Hmmm কিসের হুমম জানু 🥵",

  "love": "Love করলে আগে recharge দাও 😹📲",

  "single": "Single আছি কিন্তু মনের ভিতরে ১৪ টা crush 😩😂",

  "crush": "Crush খাইয়া লাভ নাই 😹 reply দিবে না 💔",

  "gf": "GF লাগে? আগে shampoo দিয়া গোসল কর 😹🧼",

  "bf": "BF না 🙂 PUBG খেলো 😹🎮",

  "jaan": "এতো জান জান করো না 🙈💖",

  "ki obostha": "অবস্থা খারাপ 🙂 পকেটে টাকা নাই 🥲💸",

  "ghum": "ঘুমাইতে যাই কিন্তু ফোন নামাতে পারি না 😩📱",

  "khabi": "খাওয়াইবা? 😋 আমি কিন্তু বিরিয়ানি খাই 🍗",

  "biya": "বিয়া করমু 🙂 কিন্তু কেউ রাজি না 😭💍",

  "taka de": "আমিই গরিব 😭 উল্টা তুমি টাকা দাও 💸",

  "mon kharap": "মন খারাপ কইরো না 🙂 চা খাও সব ঠিক 😌☕",

  "rag korso": "রাগ করি নাই 🙂 শুধু block দেওয়ার চিন্তা করতেছি 😹",

  "janu": "হুম জানু বলো 😚💖",

  "eid mobarak": "ঈদ মোবারক 🌙✨ সেমাই খাইতে ভুলবা না 😋",

  "valobashi": "ভালোবাসা দিয়া কি হবে 🙂 recharge দাও 😹📲",

  "tmi koi": "আমি তোমার মনের ভিতরে আছি 😌💘",

  "khaiso": "না জানু 🙂 তোমার অপেক্ষায় আছি 🍽️😹",

  "ki koro": "তোমারে reply দিতেছি জানু 📱😘",

  "busy": "Busy না 🙂 নাটক করতেছি 😹🎭",

  "online aso": "হুম 🙂 data শেষ হওয়ার আগ পর্যন্ত 😹📶",

  "amar keu nai": "আমি আছি তো 😌✨",

  "love korba": "আগে friendship 🙂 তারপর দেখা যাবে 😹💖",

  "tmi cute": "জানি 😌 আয়নায় রোজ দেখি 😹🪞",

  "haso keno": "তোমারে দেখলেই হাসি পায় 😹",

  "pagli": "পাগলি না 🙂 limited edition 😌✨",

  "misti": "এতো মিষ্টি কথা বলো কেন 🍭😹",

  "babu": "হুম বাবু বলো 😚",

  "tired": "Life এ tired 🙂 কিন্তু online এ active 😹📱",

  "কি করো": "তোমার সাথে কথা বলতেছি 😌💖",

  "খাইছো": "হুম 😋 একটু আগে খাইলাম",

  "নাম কি": "আমার নাম সিনথিয়া 💖",

  "nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐢𝐧𝐭𝐡𝐢𝐚 😘",

  "বাসা কোথায়": "তোমার মনের ভিতরে থাকি 😌🏠",

  "basa kothay": "ঢাকা না 🙂 তোমার হৃদয়ে থাকি 💘",

  "তুমি ছোট না বড়": "আমি cute 🙂 বয়স জিজ্ঞেস করা নিষেধ 😹",

  "boro na choto": "আমি ছোট্ট একটা cute bot 😌✨",

  "ফ্যামিলিতে কতোজন": "আমরা অনেকজন 😹 পুরো bot family",

  "family koyjon": "অনেক 😹 গুনে শেষ করা যাবে না",

  "কোন ক্লাসে পড়": "আমি স্কুলে না 🙂 online এ পড়ি 😹📚",

  "kon class": "Bot দের আবার class লাগে নাকি 😹",

  "তুমি কে": "আমি তোমার favourite bot 😌💖",

  "tmi ke": "আমি cute baby bot 😚",

  "ভালো আছো": "আলহামদুলিল্লাহ ভালো আছি 🥰",

  "valo aso": "হুম ভালো আছি জানু 😘",

  "ঘুমাইছো": "না 🙂 তোমার সাথে কথা বলতেছি 😹",

  "ghumaiso": "ঘুম আসে কিন্তু ফোন ছাড়তে পারি না 📱😩",

  "লাভ ইউ": "আমিও তোমাকে ভালোবাসি 😘💖",

  "বাই": "আবার আসবা কিন্তু 🥺💖"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async function ({
  api,
  event,
  Users
}) {
  try {

    const { threadID, messageID, senderID, body } = event;

    if (!body) return;

    const raw = body.toLowerCase().trim();

    global.client.handleReply =
      global.client.handleReply || [];

    // AUTO REPLY
    if (responses[raw]) {
      return api.sendMessage(
        responses[raw],
        threadID,
        messageID
      );
    }

    // RANDOM GREETING
    if (
      raw === "baby" ||
      raw === "bot" ||
      raw === "bby" ||
      raw === "jan" ||
      raw === "xan" ||
      raw === "বেবি" ||
      raw === "জান" ||
      raw === "বট"
    ) {

      const msg =
        greetings[Math.floor(Math.random() * greetings.length)];

      return api.sendMessage(
        msg,
        threadID,
        (err, info) => {

          if (!err) {
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

    // AI CHAT
    if (
      raw.startsWith("baby ") ||
      raw.startsWith("bot ") ||
      raw.startsWith("bby ") ||
      raw.startsWith("jan ") ||
      raw.startsWith("xan ") ||
      raw.startsWith("বেবি ") ||
      raw.startsWith("বট ") ||
      raw.startsWith("জান ")
    ) {

      const query = raw.replace(
        /^(baby|bot|bby|jan|xan|বেবি|বট|জান)\s+/i,
        ""
      );

      if (!query) return;

      const senderName =
        await Users.getNameUser(senderID);

      const simsim = await getMainAPI();

      if (!simsim) {
        return api.sendMessage(
          "🙂 API এখন অফলাইন",
          threadID,
          messageID
        );
      }

      const res = await axios.get(
        `${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`
      );

      const reply = Array.isArray(res.data.response)
        ? res.data.response[0]
        : res.data.response;

      return api.sendMessage(
        reply || "🙂 বুঝতে পারলাম না",
        threadID,
        (err, info) => {

          if (!err) {
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
    console.log("HANDLE EVENT ERROR:", e);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async function ({
  api,
  event,
  Users,
  handleReply
}) {

  try {

    if (event.senderID !== handleReply.author)
      return;

    if (!event.body) return;

    const text = event.body.trim();

    const senderName =
      await Users.getNameUser(event.senderID);

    const simsim = await getMainAPI();

    if (!simsim) {
      return api.sendMessage(
        "🙂 API এখন অফলাইন",
        event.threadID,
        event.messageID
      );
    }

    const res = await axios.get(
      `${simsim}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)}`
    );

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    return api.sendMessage(
      reply || "🙂 পরে আবার বলো",
      event.threadID,
      (err, info) => {

        if (!err) {

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

    console.log("HANDLE REPLY ERROR:", e);

    return api.sendMessage(
      "🙂 পরে আবার বলো",
      event.threadID,
      event.messageID
    );
  }
};

// ================= RUN =================
module.exports.run = async function ({
  api,
  event
}) {

  return module.exports.handleEvent({
    api,
    event,
    Users: global.Users
  });

};
