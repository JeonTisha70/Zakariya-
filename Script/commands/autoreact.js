
module.exports.config = {
  name: "autoreact",
  version: "1.1.2",
  hasPermission: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Bot Auto React",
  commandCategory: "no prefix",
  cooldowns: 0
};

module.exports.handleEvent = async ({ api, event }) => {
  try {
    if (!event || !event.messageID) return;

    const threadData =
      global.data.threadData.get(event.threadID) || {};

    // OFF CHECK (safe)
    if (threadData["🥰"] === false) return;

    // SAFE EMOJIS LIST (must not be empty)
    const emojis = ["🥰", "😂", "👍", "😹", "🔥", "❤️"];
    const randomEmoji =
      emojis[Math.floor(Math.random() * emojis.length)];

    return api.setMessageReaction(
      randomEmoji,
      event.messageID,
      (err) => {
        if (err) console.log("Reaction Error:", err.message);
      },
      true
    );

  } catch (err) {
    console.log("AUTOREACT ERROR:", err.message);
  }
};

module.exports.run = async ({ api, event, Threads }) => {
  try {
    const threadID = event.threadID;

    const threadData = await Threads.getData(threadID);
    const data = threadData?.data || {};

    // TOGGLE SAFE
    data["🥰"] = !(data["🥰"] === true);

    await Threads.setData(threadID, { data });

    if (global.data && global.data.threadData) {
      global.data.threadData.set(String(threadID), data);
    }

    return api.sendMessage(
      `Auto-react is now ${(data["🥰"] ? "ON 🟢" : "OFF 🔴")}`,
      threadID,
      event.messageID
    );

  } catch (err) {
    console.log("TOGGLE ERROR:", err.message);

    return api.sendMessage(
      "❎ Failed to toggle auto-react",
      event.threadID,
      event.messageID
    );
  }
};
