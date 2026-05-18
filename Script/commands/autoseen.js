const fs = require("fs-extra");
const path = require("path");

const pathFile = path.join(__dirname, "cache", "autoseen.txt");

// ================= FILE CREATE =================
if (!fs.existsSync(pathFile)) {
  fs.ensureFileSync(pathFile);
  fs.writeFileSync(pathFile, "false");
}

module.exports.config = {
  name: "autoseen",
  version: "1.0.1",
  hasPermission: 2,
  credits: "JAKARIYA",
  description: "Automatically mark messages as seen",
  commandCategory: "tools",
  usages: "on/off",
  cooldowns: 5
};

// ================= HANDLE EVENT =================
module.exports.handleEvent = async function ({ api }) {
  try {
    const status = fs.readFileSync(pathFile, "utf-8").trim();

    if (status === "true") {
      return api.markAsReadAll(() => {});
    }

  } catch (err) {
    console.log("AUTOSEEN HANDLE ERROR:", err.message);
  }
};

// ================= RUN COMMAND =================
module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID } = event;

    if (!args[0]) {
      return api.sendMessage(
        `⚠️ Use:\n${global.config.PREFIX}autoseen on\n${global.config.PREFIX}autoseen off`,
        threadID,
        messageID
      );
    }

    const option = args[0].toLowerCase();

    // ================= ON =================
    if (option === "on") {

      fs.writeFileSync(pathFile, "true");

      return api.sendMessage(
        "✅ AutoSeen turned ON successfully",
        threadID,
        messageID
      );
    }

    // ================= OFF =================
    if (option === "off") {

      fs.writeFileSync(pathFile, "false");

      return api.sendMessage(
        "✅ AutoSeen turned OFF successfully",
        threadID,
        messageID
      );
    }

    // ================= INVALID =================
    return api.sendMessage(
      `⚠️ Wrong format\nUse:\n${global.config.PREFIX}autoseen on/off`,
      threadID,
      messageID
    );

  } catch (err) {
    console.log("AUTOSEEN RUN ERROR:", err.message);

    return api.sendMessage(
      "❎ Failed to update AutoSeen settings",
      event.threadID,
      event.messageID
    );
  }
};
