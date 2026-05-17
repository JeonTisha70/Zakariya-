
module.exports.config = {
  name: "art",
  version: "1.0.1",
  hasPermission: 0,
  credits: "CYBER BOT TEAM",
  description: "Apply AI art style (anime)",
  commandCategory: "editing",
  usages: "reply to an image",
  cooldowns: 5,
  usePrefix: true
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");
  const FormData = require("form-data");

  const { messageReply, threadID, messageID } = event;

  const cacheDir = path.join(__dirname, "cache");
  const filePath = path.join(cacheDir, "artify.jpg");

  try {
    await fs.ensureDir(cacheDir);

    // ================= CHECK IMAGE =================
    if (
      !messageReply ||
      !messageReply.attachments ||
      messageReply.attachments.length === 0
    ) {
      return api.sendMessage(
        "❌ Please reply to an image.",
        threadID,
        messageID
      );
    }

    const url = messageReply.attachments[0].url;
    if (!url) {
      return api.sendMessage(
        "❌ Invalid image URL.",
        threadID,
        messageID
      );
    }

    // ================= DOWNLOAD IMAGE =================
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 15000
    });

    fs.writeFileSync(filePath, Buffer.from(response.data));

    // ================= FORM DATA =================
    const form = new FormData();
    form.append("image", fs.createReadStream(filePath));

    // ================= API REQUEST =================
    const apiRes = await axios.post(
      "https://art-api-97wn.onrender.com/artify?style=anime",
      form,
      {
        headers: form.getHeaders(),
        responseType: "arraybuffer",
        timeout: 60000
      }
    );

    fs.writeFileSync(filePath, Buffer.from(apiRes.data));

    return api.sendMessage(
      {
        body: "🎨 AI art applied successfully!",
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => {
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch {}
      },
      messageID
    );

  } catch (err) {
    console.log("ART ERROR:", err.message);

    return api.sendMessage(
      "❌ AI art failed. Please try again later.",
      threadID,
      messageID
    );
  }
};
