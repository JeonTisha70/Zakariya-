module.exports.config = {
  name: "antiout",
  version: "1.0.1",
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  hasPermission: 1,
  description: "Turn ON/OFF antiout",
  usages: "antiout on/off",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
  try {
    const threadID = event.threadID;

    const data = (await Threads.getData(threadID))?.data || {};

    // ================= TOGGLE SAFE =================
    data.antiout = !(data.antiout === true);

    await Threads.setData(threadID, { data });

    // ================= GLOBAL SAFE =================
    if (global.data && global.data.threadData) {
      global.data.threadData.set(String(threadID), data);
    }

    return api.sendMessage(
      `✅ Done ${(data.antiout ? "Turn ON" : "Turn OFF")} antiout successfully!`,
      threadID,
      event.messageID
    );

  } catch (err) {
    console.log("ANTIOUT ERROR:", err.message);

    return api.sendMessage(
      "❎ Something went wrong in antiout system",
      event.threadID,
      event.messageID
    );
  }
};
