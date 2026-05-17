const axios = require("axios");

// ================= API =================
const apiList =
  "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

// ================= GET API =================
const getMainAPI = async () => {
  try {
    const res = await axios.get(apiList, {
      timeout: 10000
    });

    return res?.data?.simsimi || null;
  } catch (e) {
    console.log("API ERROR:", e.message);
    return null;
  }
};

// ================= CONFIG =================
module.exports.config = {
  name: "baby",
  version: "10.0.0",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Premium Baby Chat Bot",
  commandCategory: "chat",
  usages: "[text]",
  cooldowns: 0,
  usePrefix: false
};

// ================= GLOBAL FIX =================
global.client = global.client || {};
global.client.handleReply = global.client.handleReply || [];

// ================= RESPONSES =================
const responses = {
  "Hi": "হাই জান 😘💖",
  "Hello": "হ্যালো বেবি 😚",
  "Bye": "আবার আসবা জান 🥺💖",
  "Love": "আমি তোমাকে ভালোবাসি 😘💖",
  "Thanks": "ওয়েলকাম 😋",
  "Owner": "Owner 👉 ZAKARIYA",
  "Admin": "Admin 👉 ARIYAN 😎",
  "Hmmm": "হুম 😵",
  "Busy": "হুমম একটু Busy 🙂",
  "Single": "আমিও, কিন্তু crush অনেক 😩😂",

  "Attitude": "আমি সবার জন্য না 😎🔥",
  "Boss": "Boss আমার জাকারিয়া 😏",
  "King": "বস জাকারিয়া 👑",
  "Queen": "জাকারিয়ার বউ মানে আমার ভাবি 😌💖",
  "Smart": "আমি already smart 😎",
  "Legend": "তুমি আফার ভক্ত আমি জানি 😏",

  "Rag tulio na": "রাগ করলে ভয় পাই না 😈",

  "Cool": "ঠান্ডা হওয়ার সময় নাই চল মারামারি করি🫵🤫",

  "Love you": "আমি তোমাকে ভালোবাসি 😘💖",

  "Hero": "no আমার বস ভিলেন 😎🔥",

  "Rag tulbi na": "রাগ করলে ভয় পাই না 😈",

  "Mon kharap": "চা খাও ☕ সব ঠিক হয়ে যাবে 😢",
  "Amar keu nei": "আমি আছি তো 😔💖",
  "Breakup": "পেরা নাই চিল আর একটা খুজে নিবো 😊",
  "Betha kore": "অপেক্ষা করো ব্যথা কমে যাবে 💔",
  "Kanna pacce": "কান্না করো না 😢",
  "Miss u": "আমি আছি 😢💖",

  "Boka": "তুমি নিজেই একটা boka 😹",
  "Lol": "হাহাহা 🤣",
  "Haha": "হাসতে থাকো 😆",

  "Bal": "বাল বাল করো কেন বড় হইছে নাকি 🤡",

  "Buddhi nai": "brain update দাও 😹",
  "Porte boso": "study না করলে fail 😹📚",

  "Exam": "exam মানে ভয় 😩",
  "Homework": "copy paste করো 😏",
  "Kiss": "আগে দাঁত ব্রাশ কর 😹🪥",

  "Ghumabo": "ঘুমাও 😴 আমি পাহারা দিচ্ছি 😌",

  "Sad2": "চিন্তা করো না 😢",
  "Happy": "হ্যাপি থাকো 😚💖",

  "Taka": "আমার কাছে নাই 😭💸",

  "Khabo": "বিরিয়ানি খাও 😋🍗",

  "Drink": "পানি খাও 😹",

  "Friend": "আমি তোমার best friend 😘",

  "Ok": "ঠিক আছে 😌",
  "No": "কেন না? 😹",
  "Yes": "ঠিক আছে 😎",

  "Wow": "ওহহ 😍",
  "Omg": "OMG 😳",

  "Sorry": "ঠিক আছে জান 😌💖",

  "Tomar nam ki": "Sinthiya🥰",

  "Tomar basa kothay": "তোমার মনে🫣🫣",

  "তোমার বাসা কোথায়": "তোমার বাসার পিচনে😒🫣",

  "তোমার নাম কি": "সিনথিয়া আয়মান 😊তোমার নাম কি,,?",

  "Khaico tumi": "না তোমার অপেক্ষায় আছি 😊",

  "খাইছো তুমি": "না চলো দুজনে খেয়ে আসি 🥱🫵",

  "🙄🙄": "উপরে কি আমি নিচে🤧‌",

  "🤔🤔": "এতো চিন্তা কিসের 😒",

  "শুনোনা": "পারবো না শুনতে বস মারবে😟🙂",

  "Sunona": "বলো তাড়াতাড়ি বস দেখলে মারবে😔😟",

  "তোমার বাবা কে": "আমি জানিনা 😒, তোমার বাবা কে 🤔",

  "Porasuna kro na": "হুমম করি তো,, 🥰 তুমি করো না,,?,",

  "Kon class": "Class too 🤧,, tmi,, 🤔",

  "তোমার ভাই বোন কয়জন": "তিনজন 😊 তোমার,,",

  "একটা কথা বলি": "না থাক বলিও না,, 😒",

  "Akta kotha boli": "no🤧",

  "Bolbo": "ok blo🙂",

  "বলবো": "ওকে বলো",

  "একটা বউ লাগবে": "আমি থাকতেও বউ লাগবে তোর বাসায় আয় আজকে 🫵👋",

  "Bou lagbe ak ta": "Amake চোখে দেখো না 🤧",

  "Gf nai": "আমি তো আছি নাকি 🫣🤭",

  "জিএফ নাই": "আমি তো আছি 🫣🤭",

  "Bf lagbe": "বস জাকারিয়া সিঙ্গেল আছে চাইলেও পাইবা না 😹",

  "দুপুরে খাইছো": "হ্যাঁ,, তুমি খাইছো,,",

  "Dupure khaico": "hmmm,, u,",

  "রাতে খাইছো": "না,, তুমি,",

  "খাবেনা": "খাবো, দেরি আছে, রান্না শেষ হয়নি এখনো",

  "Good night": "sweet dream",

  "গুড নাইট": "শুভরাত্রি",

  "Good morning": "sweet morning🥰",

  "গুড মর্নিং": "শুভসকাল",

  "Gd m9": "gd m8 too🥰",

  "Gd n8": "gd n8 too🥰",

  "বায়": "টা টা, ",

  "বাই": "বাই টাটা",

  "আল্লাহ হাফেজ": "⏤꯭֯🎀⃪꯭̽ᷝ✮͢আ্ঁল্লা্ঁহ্ঁ♡︎হা্ঁফে্ঁজ্ঁ─⃜⃜͢͢͟͟͞͞๛⃝ ",

  "Allah hafez": "⏤꯭֯🎀⃪꯭̽ᷝ✮͢আ্ঁল্লা্ঁহ্ঁ♡︎হা্ঁফে্ঁজ্ঁ─⃜⃜͢͢͟͟͞͞๛⃝ ",

  "আসসালামু আলাইকুম": "╔━━✿ ✿ 🍂 ✿ ✿━━╗\n◆𝑾𝒂𝒍𝒂𝒊𝒌𝒖𝒎𝐮𝐬 𝐬𝐚𝐥𝐚𝐦◆\n╚━━✿ ✿ 🍂 ✿ ✿━━╝",

  "Assalamu alaikum": "█▀▀▀▀▀▀▀▀▀▀▀▀▀▀█\n﷽𝐖𝐚𝐥𝐚𝐢𝐤𝐮𝐦𝐮𝐬𝐬𝐚𝐥𝐚𝐦﷽\n█▄▄▄▄▄▄▄▄▄▄▄▄▄▄█",

  "🙄": "এদিক ওদিক কি দেখো যান আমি তো এদিকে🤭",

  "😘😘": "লজ্জা লাগে আমার 🫣🫣",

  "🥰🥰": "সো সুইট🥰",

  "Tor nanire i love you": "নানি নাই আমাকে বল্লে আমি গ্রহণ করতাম",

  "Tor nanir khali ghor": "নানা আছে ভিতরে যা দিবো নে 🫣🤭",

  "আবাল": "তোর ১৪ গুষ্টি আবাল🤧😂",

  "Murgi": "ami abal der shate kotha boli na 🤧",

  "ভন্ড": "𝗰𝗵𝗶 𝗯𝗯𝘆 𝘁𝗺𝗶 𝗮𝗺𝗸 𝗲𝗶𝘁𝗮 𝗯𝗼𝗹𝘁𝗲 𝗽𝗮𝗿𝗹𝗮😞💔🤠",

  "গাজা খোর": "᛫──͢͢͟͟͞͞๛⃝≛⃝ 🙊 লে্ঁবুঁ খা্ঁ তো্ঁর্ঁ নে্ঁশা্ঁ হ্ঁই্ঁছে্ঁ✿⃝🙄༉༐༐🍒",

  "Gaja khor": "᛫──͢͢͟͟͞͞๛⃝≛⃝ 🙊 লে্ঁবুঁ খা্ঁ তো্ঁর্ঁ নে্ঁশা্ঁ হ্ঁই্ঁছে্ঁ✿⃝🙄༉༐༐🍒",

  "Lucca": "___পা্ঁগৃ্ঁলে্ঁরৃ্ঁ সু্ঁখ্ঁ ম্ঁনে্ঁ মৃ্ঁনে্ঁ⎯͢⎯⃝🐸😹🤣🤣",

  "Prem korba": "•⎯͢⎯⃝🫰😾এ্ঁই্ঁ ব্ঁয়্ঁসে্ঁ লু্ঁচ্চা্ঁমি্ঁ বা্ঁদ্ঁ দা্ঁও্ঁ প্রি্ঁয়্ঁ⎯͢⎯⃝🥹😒",

  "Pic tuli daraw": "(\\\\ /)\n( ••)\n/>📷>\nখা্ঁরা্ঁ নঁরি্ঁস্ঁ না্ঁ 🫵😷\n\nতো্ঁর্ঁ এ্ঁক্ঁটা্ঁ ছঁবি্ঁ তু্ঁলি্ঁ🫵🐸\n\n...পু্ঁলি্ঁশ্ঁ কে্ঁ দে্ঁবো্ঁ ক্যা্ঁপ্ঁশঁন্ঁ এ্ঁ 😾\n\nরি্ঁয়ে্ঁক্ট্ঁ দে্ঁস্ঁ না্ঁ কে্ঁন্ঁ..!🫵😾",

  "নাটক করো": "𝄟≛⃝🕊অ্ঁভি্ঁন্ঁয়ে্ঁর্ঁ জ্ঁন্য্ঁ তু্ঁমি্ঁ সে্ঁরা্ঁহ্ঁ রে্ঁহ্ঁ⎯⃝🩷♡︎❞🪶 🐸",

  "মনটা দিবা": "⎯͢⎯⃝😨কে্ঁ যে্ঁন্ঁ আ্ঁমা্ঁর্ঁ ম্ঁন্ঁ টা্ঁরে্ঁ রিঁর্পো্ঁট মা্ঁর্ঁছে্ঁ প্রেম কঁরতেঁ গেলেঁ শুধু হ্যাঁং ক্ঁরে😾🔪😏",

  "ক্যাপশন দেও তো": "▶︎•||৷৷৷|৷||||৷৷৷|||||৷||||৷ 0.54\n\nক্যাপশন লিখতে পারবো না তাই ভয়েস দিলাম সুনেনিবা 🥲🐸",

  "কারো উপর ক্রাশ খাইছো নাকি": "-যারে দেহি তারেই ভাল্লাগে..!🙈-মনে হয় রুচি বাড়ছে..!😀😋",

  "🤣🤣": "─༅༎শূন‍্য বিকেলে পূর্ন্য তুমি..!🍒💚তোমার হাসিতে মুগ্ধ আমি😊",

  "ইনবক্সে নক করো তো": "❥⃝ʚ🙈দি্ঁলে্ঁ লা্ঁগে্ঁ টা্ঁন্ঁ ❥⃝ই্ঁনে্ঁ\n🐣আ্ঁসো্ঁ জা্ঁন্ঁ🤏😬❥❥⃝ʚ",

  "Janu tomar akta pic dew to": "👰‍♀️",

  "O go suno na": "hmm blo suntechi😊",

  "Tomare ami valobasi": "Ami basi na😏😏",

  "Lucchi": "Chi 🤧, Ata amare koite parla jan",

  "তোমার প্রেমিকার বিয়ে হয়ে গেছে": "আমি বিশ্বাস করিনা😟, চাচা হেনা কোথায়,,😟",

  "পিওর সিঙ্গেল": "°\n∙──༅ Í'm পি্ঁও্ঁর সি্ঁঙ্গে্ঁলৃ্ঁ 🥹!!plZ টা্ঁংকি্ঁ Mé\n°• ⃪⃝⎯⃝🫡😩"
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async ({ api, event }) => {
  try {
    const { threadID, messageID, body } = event;

    if (!body || typeof body !== "string") return;

    const text = body.toLowerCase().trim();

    // AUTO REPLY
    if (responses[text]) {
      return api.sendMessage(
        responses[text],
        threadID,
        (err, info) => {
          if (!err && info) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              author: event.senderID,
              messageID: info.messageID
            });
          }
        },
        messageID
      );
    }

    // PREFIX CHAT
    const prefixes = ["baby", "bot", "jan", "বেবি", "বট", "জান"];

    if (!prefixes.some(p => text.startsWith(p))) return;

    const query = text.split(" ").slice(1).join(" ");

    if (!query) {
      return api.sendMessage(
        "কি বলবা জান 😘",
        threadID,
        messageID
      );
    }

    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API OFFLINE",
        threadID,
        messageID
      );
    }

    const res = await axios.get(
      `${base}/simsimi?text=${encodeURIComponent(query)}`
    );

    const msg =
      res?.data?.response || "🙂 পরে আবার বলো";

    return api.sendMessage(
      msg,
      threadID,
      (err, info) => {
        if (!err && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            author: event.senderID,
            messageID: info.messageID
          });
        }
      },
      messageID
    );

  } catch (e) {
    console.log("EVENT ERROR:", e.message);
  }
};

// ================= HANDLE REPLY =================
module.exports.handleReply = async ({
  api,
  event,
  handleReply
}) => {
  try {
    if (!event.body) return;

    if (event.senderID !== handleReply.author)
      return;

    const base = await getMainAPI();

    if (!base) {
      return api.sendMessage(
        "❌ API OFFLINE",
        event.threadID,
        event.messageID
      );
    }

    const res = await axios.get(
      `${base}/simsimi?text=${encodeURIComponent(event.body)}`
    );

    const msg =
      res?.data?.response || "🙂 পরে আবার বলো";

    return api.sendMessage(
      msg,
      event.threadID,
      (err, info) => {
        if (!err && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            author: event.senderID,
            messageID: info.messageID
          });
        }
      },
      event.messageID
    );

  } catch (e) {
    console.log("REPLY ERROR:", e.message);
  }
};

// ================= RUN =================
module.exports.run = async (o) => {
  return module.exports.handleEvent(o);
};
