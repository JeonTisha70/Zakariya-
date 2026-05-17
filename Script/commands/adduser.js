
module.exports.config = {
  name: "adduser",
  version: "1.3.0",
  hasPermission: 1,
  credits: "JAKARIYA",
  description: "Add user to group using UID or Facebook link",
  commandCategory: "system",
  usages: "[uid/link]",
  cooldowns: 5
};

const axios = require("axios");

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  const reply = (msg) =>
    api.sendMessage(msg, threadID, messageID);

  try {
    if (!args[0]) {
      return reply("⚠️ UID বা Facebook profile link দিন।");
    }

    let uid = String(args[0]).trim();

    // ================= UID CHECK =================
    if (/^\d+$/.test(uid)) {
      return await addUserToGroup(uid);
    }

    // ================= LINK CHECK =================
    if (!uid.includes("facebook.com") && !uid.includes("fb.com")) {
      return reply("⚠️ Valid Facebook profile link দিন।");
    }

    let html;
    try {
      const res = await axios.get(uid, { timeout: 10000 });
      html = res.data;
    } catch {
      return reply("❎ Link open করা যাচ্ছে না (timeout/error)");
    }

    let match =
      html.match(/"userID":"(\d+)"/) ||
      html.match(/"profile_id":"(\d+)"/);

    if (!match) {
      return reply("❎ UID extract করা যায়নি।");
    }

    uid = match[1];
    return await addUserToGroup(uid);

    // ================= ADD USER =================
    async function addUserToGroup(uid) {
      try {
        const info = await api.getThreadInfo(threadID);

        const participants = (info.participantIDs || []).map(String);
        const admins = (info.adminIDs || []).map(e => String(e.id));
        const botID = String(api.getCurrentUserID());
        uid = String(uid);

        if (participants.includes(uid)) {
          return reply("⚠️ এই ইউজার আগেই গ্রুপে আছে।");
        }

        try {
          await api.addUserToGroup(uid, threadID);
        } catch (err) {
          console.log("ADD ERROR:", err.message);
          return reply("❎ ইউজার add করা যায়নি (permission/privacy issue)");
        }

        if (info.approvalMode && !admins.includes(botID)) {
          return reply("📩 Request List এ যোগ হয়েছে ✔️");
        }

        return reply("✅ Successfully added user ✔️");

      } catch (err) {
        console.log("THREAD ERROR:", err.message);
        return reply("❎ Group info পাওয়া যাচ্ছে না!");
      }
    }

  } catch (err) {
    console.log("GLOBAL ERROR:", err.message);
    return reply("❎ Unexpected error হয়েছে, পরে try করুন।");
  }
};
