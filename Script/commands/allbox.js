module.exports.config = {
  name: 'allbox',
  version: '1.0.1',
  credits: '𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️',
  hasPermission: 2,
  description: '[Ban/Unban/Del/Remove] List threads',
  commandCategory: 'Admin',
  usages: '[page/all]',
  cooldowns: 5
};

module.exports.handleReply = async function ({
  api,
  event,
  handleReply,
  Threads
}) {
  try {
    const { threadID } = event;

    if (!handleReply) return;

    if (String(event.senderID) !== String(handleReply.author)) return;

    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY");

    const arg = (event.body || "").split(" ");
    const idgr = handleReply.groupid?.[arg[1] - 1];
    const groupName = handleReply.groupName?.[arg[1] - 1];

    if (!idgr) return;

    switch (handleReply.type) {

      case "reply": {

        // ================= BAN =================
        if (arg[0]?.toLowerCase() === "ban") {
          const data = (await Threads.getData(idgr))?.data || {};
          data.banned = 1;
          data.dateAdded = time;

          await Threads.setData(idgr, { data });
          global.data.threadBanned.set(idgr, { dateAdded: time });

          return api.sendMessage(
            `★ BAN SUCCESS ★\n\n${groupName}\nTID: ${idgr}`,
            threadID,
            () => api.unsendMessage(handleReply.messageID)
          );
        }

        // ================= UNBAN =================
        if (["unban", "ub"].includes(arg[0]?.toLowerCase())) {
          const data = (await Threads.getData(idgr))?.data || {};
          data.banned = 0;
          data.dateAdded = null;

          await Threads.setData(idgr, { data });
          global.data.threadBanned.delete(idgr);

          return api.sendMessage(
            `★ UNBAN SUCCESS ★\n\n${groupName}\nTID: ${idgr}`,
            threadID,
            () => api.unsendMessage(handleReply.messageID)
          );
        }

        // ================= DELETE =================
        if (arg[0]?.toLowerCase() === "del") {
          await Threads.delData(idgr, {});
          return api.sendMessage(
            `★ DELETE SUCCESS ★\n\n${groupName}\nTID: ${idgr}`,
            threadID,
            handleReply.messageID
          );
        }

        // ================= OUT =================
        if (arg[0]?.toLowerCase() === "out") {
          return api.removeUserFromGroup(
            api.getCurrentUserID(),
            idgr,
            () => api.unsendMessage(handleReply.messageID)
          );
        }

        break;
      }
    }
  } catch (err) {
    console.log("HANDLE REPLY ERROR:", err.message);
  }
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID } = event;

    // ================= ALL THREAD LIST =================
    if (args[0] === "all") {

      let data = global.data.allThreadID || [];
      let threadList = [];

      let i = 1;

      for (const thread of data) {
        try {
          const info = global.data.threadInfo?.get(thread);
          const nameThread = info?.threadName || "Unknown group";

          threadList.push(
            `${i++}. ${nameThread}\n🔰TID: ${thread}`
          );
        } catch (e) {
          threadList.push(`${i++}. Unknown group\n🔰TID: ${thread}`);
        }
      }

      if (!threadList.length) {
        return api.sendMessage("❎ No group found!", threadID, messageID);
      }

      return api.sendMessage(
        `🍄 Total Groups: ${threadList.length}\n\n${threadList.join("\n")}`,
        threadID,
        messageID
      );
    }

    return api.sendMessage(
      "⚠️ Use: allbox all",
      threadID,
      messageID
    );

  } catch (err) {
    console.log("RUN ERROR:", err.message);
    return api.sendMessage(
      "❎ Something went wrong!",
      event.threadID,
      event.messageID
    );
  }
};
