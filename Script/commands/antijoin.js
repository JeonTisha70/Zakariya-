
module.exports.config = {
  name: "antijoin",
  version: "1.0.1",
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  hasPermission: 1,
  description: "Turn on/off anti join",
  commandCategory: "system",
  usages: "antijoin on/off",
  cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
  try {
    const threadID = event.threadID;

    const info = await api.getThreadInfo(threadID);

    // ================= ADMIN CHECK =================
    const isAdmin = (info.adminIDs || []).some(
      item => String(item.id) === String(api.getCurrentUserID())
    );

    if (!isAdmin) {
      return api.sendMessage(
        "[ ANTI JOIN ] » Need group admin permission, please add bot as admin",
        threadID,
        event.messageID
      );
    }

    // ================= THREAD DATA =================
    const data = (await Threads.getData(threadID))?.data || {};

    // toggle logic safe
    data.newMember = !(data.newMember === true);

    await Threads.setData(threadID, { data });

    if (global.data && global.data.threadData) {
      global.data.threadData.set(String(threadID), data);
    }

    return api.sendMessage(
      `[ ANTI JOIN ] » Anti Join ${(data.newMember ? "ON" : "OFF")} Successfully ✅`,
      threadID,
      event.messageID
    );

  } catch (err) {
    console.log("ANTIJOIN ERROR:", err.message);

    return api.sendMessage(
      "❎ Something went wrong in antijoin system",
      event.threadID,
      event.messageID
    );
  }
};
