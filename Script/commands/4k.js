
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "4k",
    version: "3.1.0",
    hasPermssion: 0,
    credits: "JAKARIYA",
    description: "Enhance image into 4K quality",
    commandCategory: "Image Tools",
    usages: "Reply to an image with 4k",
    cooldowns: 5,
    usePrefix: true,
    dependencies: {
      axios: "",
      "fs-extra": ""
    }
  },

  handleEvent: async function ({ api, event }) {
    try {
      const { body, messageReply } = event;

      if (!body) return;

      const text = body.toLowerCase().trim();

      if (text !== "4k") return;

      if (
        !messageReply ||
        !messageReply.attachments ||
        !messageReply.attachments[0]
      ) {
        return api.sendMessage(
          "📸 Please reply to a photo!",
          event.threadID,
          event.messageID
        );
      }

      const attachment = messageReply.attachments[0];

      if (attachment.type !== "photo") {
        return api.sendMessage(
          "❎ Only photo replies are supported!",
          event.threadID,
          event.messageID
        );
      }

      return enhanceImage(
        api,
        event.threadID,
        event.messageID,
        attachment.url
      );

    } catch (err) {
      console.log("HANDLE ERROR:", err.message);

      return api.sendMessage(
        "❎ Failed to process image!",
        event.threadID,
        event.messageID
      );
    }
  },

  run: async function ({ api, event }) {
    try {
      const { messageReply } = event;

      if (
        !messageReply ||
        !messageReply.attachments ||
        !messageReply.attachments[0]
      ) {
        return api.sendMessage(
          "📸 Reply to a photo first!",
          event.threadID,
          event.messageID
        );
      }

      const attachment = messageReply.attachments[0];

      if (attachment.type !== "photo") {
        return api.sendMessage(
          "❎ Invalid file type!",
          event.threadID,
          event.messageID
        );
      }

      return enhanceImage(
        api,
        event.threadID,
        event.messageID,
        attachment.url
      );

    } catch (err) {
      console.log("RUN ERROR:", err.message);

      return api.sendMessage(
        "❎ Failed to process image!",
        event.threadID,
        event.messageID
      );
    }
  }
};

async function enhanceImage(api, threadID, messageID, imageUrl) {

  let waitMsg;

  try {

    // CACHE FOLDER
    const cacheDir = path.join(__dirname, "cache");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    // FILE PATH
    const filePath = path.join(
      cacheDir,
      `4k_${Date.now()}.jpg`
    );

    // WAIT MESSAGE
    waitMsg = await api.sendMessage(
      "⏳ Enhancing image into 4K...\nPlease wait.",
      threadID
    );

    // API CONFIG LINK
    const configURL =
      "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

    // GET CONFIG
    const configRes = await axios.get(configURL, {
      timeout: 15000
    });

    const apiUrl = configRes?.data?.["4k"];

    if (!apiUrl || typeof apiUrl !== "string") {
      throw new Error("API URL Missing");
    }

    // MAIN API CALL
    const apiRequest =
      `${apiUrl}?imageUrl=${encodeURIComponent(imageUrl)}`;

    const apiRes = await axios.get(apiRequest, {
      timeout: 120000
    });

    // RESULT URL
    const resultURL =
      apiRes?.data?.result ||
      apiRes?.data?.image ||
      apiRes?.data?.url;

    if (!resultURL) {
      throw new Error("No image returned");
    }

    // DOWNLOAD IMAGE
    const imageRes = await axios.get(resultURL, {
      responseType: "arraybuffer",
      timeout: 120000
    });

    // SAVE IMAGE
    fs.writeFileSync(filePath, imageRes.data);

    // SEND RESULT
    await api.sendMessage(
      {
        body: "✅ 4K Image Enhanced Successfully!",
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (e) {
          console.log("DELETE ERROR:", e.message);
        }
      },
      messageID
    );

    // REMOVE WAIT MESSAGE
    if (waitMsg?.messageID) {
      api.unsendMessage(waitMsg.messageID);
    }

  } catch (err) {

    console.log("4K ERROR:", err.message);

    // REMOVE WAIT MESSAGE
    try {
      if (waitMsg?.messageID) {
        api.unsendMessage(waitMsg.messageID);
      }
    } catch (_) {}

    return api.sendMessage(
      "❎ 4K Enhance Failed!\nTry again later.",
      threadID,
      messageID
    );
  }
}
