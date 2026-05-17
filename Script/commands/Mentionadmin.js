
module.exports.config = {
  name: "adminmention",
  version: "1.1.0",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Bot will reply when someone tags any of the admins",
  commandCategory: "Other",
  usages: "@",
  cooldowns: 1
};

module.exports.handleEvent = function ({ api, event }) {
  try {
    if (!event || !event.mentions) return;

    const adminIDs = ["61583600763759", "61586593402612"].map(String);

    const senderID = String(event.senderID || "");

    if (adminIDs.includes(senderID)) return;

    const mentionedIDs = Object.keys(event.mentions || {}).map(String);

    if (!mentionedIDs.length) return;

    const isMentioningBoss = adminIDs.some(adminID =>
      mentionedIDs.includes(adminID)
    );

    if (!isMentioningBoss) return;

    const replies = [
      "ডাকাডাকি করিস না বস ব্যস্ত আছে 😒😌",
      "বস এক ভদ্র লোক আপনাকে মেনশন দিছে 😑😃",
      "যেভাবে মেনশন দিতেছো মনে হয় বসের গার্লফ্রেন্ড , হারায় গেছে 🫥😒",
      "বস এক পাগল ছাগল , আপনাকে ডাকতেছে 🐸🫵",
      "বস এক হালায় আপনার নাম ধরছে , আপনি শুধু একবার আদেশ করুন, আজকে হালার নানিরে চমলক্ক করে দিমু 😑🥴",
      "মেনশন না দিয়া একটা girlfriend খুজে দে 🙃😮💨",
      "মাইয়া হলে জাকারিয়া বসের ইনবক্স এ যাও😗😁",
      "বস এখন ব্যস্ত আছে , কিছু বলতে হলে ইনবক্স এ গিয়ে বলো",
      "বস এখন আমার সাথে মিটিং এ আছে , মেনশন দিস না 🙂",
      "বস এখন ব্যস্ত আছে , কি বলবি আমাকে বল",
      "মেনশন না দিয়া বস বল বস 🥵💋",
      "কিরে তোর এতো সাহস আমার বসের নাম ধরিস😾🫵",
      "এতো মেনশন না দিয়া তোর গার্লফ্রেন্ডটারে দিয়া দে😹🐸",
      "এইভাবে মেনশন করতাস, না জানি তুই প্রেমে পড়ছোস 😼❤️"
    ];

    const reply =
      replies[Math.floor(Math.random() * replies.length)];

    return api.sendMessage(
      reply,
      event.threadID,
      event.messageID
    );

  } catch (err) {
    console.log("ADMINMENTION ERROR:", err.message);
  }
};

module.exports.run = function () {};
