const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "arrest",
  version: "1.0.1",
  hasPermission: 0,
  credits: "ZAKARIYA JIYEM",
  description: "Generate meme using sender and target UID",
  commandCategory: "fun",
  usages: "[@mention | reply]",
  cooldowns: 5
};

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  try {
    // ================= TARGET FIND =================
    let targetID = null;

    if (mentions && Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (messageReply && messageReply.senderID) {
      targetID = messageReply.senderID;
    }

    if (!targetID) {
      return api.sendMessage(
        "⚠️ Please reply or mention someone",
        threadID,
        messageID
      );
    }

    // ================= CACHE DIR SAFE =================
    const cacheDir = path.join(__dirname, "cache");
    await fs.ensureDir(cacheDir);

    // ================= GET API =================
    const apiList = await axios.get(
      "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json",
      { timeout: 10000 }
    );

    const AVATAR_CANVAS_API = apiList.data?.AvatarCanvas;

    if (!AVATAR_CANVAS_API) {
      return api.sendMessage(
        "❎ Avatar API not found",
        threadID,
        messageID
      );
    }

    // ================= IMAGE GENERATE =================
    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      {
        cmd: "chor",
        senderID,
        targetID
      },
      {
        responseType: "arraybuffer",
        timeout: 30000
      }
    );

    const imgPath = path.join(
      cacheDir,
      `arrest_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, Buffer.from(res.data));

    return api.sendMessage(
      {
        body: `😹 হালা মুরগী চোর, ধরা খাইছোস!`,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => {
        try {
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        } catch {}
      },
      messageID
    );

  } catch (err) {
    console.log("ARREST ERROR:", err.message);

    return api.sendMessage(
      "❎ API Error or Server Problem",
      threadID,
      messageID
    );
  }
};
