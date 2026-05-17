
module.exports.config = {
  name: "anemi",
  version: "1.0.1",
  hasPermission: 0,
  credits: "ZAKARIYA JIYEM",
  description: "Random Anime Videos From SAHU API",
  commandCategory: "video",
  usages: "anemi",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");

  const API_LIST_URL =
    "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

  try {
    await fs.ensureDir(__dirname + "/cache");

    // ================= GET API =================
    const listRes = await axios.get(API_LIST_URL, { timeout: 10000 });
    const API = listRes.data?.anime_video;

    if (!API) {
      return api.sendMessage(
        "❎ API not found or broken",
        event.threadID,
        event.messageID
      );
    }

    const filePath = path.join(
      __dirname,
      "cache",
      `anime_${Date.now()}.mp4`
    );

    // ================= DOWNLOAD =================
    const response = await axios({
      url: API,
      method: "GET",
      responseType: "stream",
      timeout: 120000
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on("finish", () => {
      try {
        api.sendMessage(
          {
            body: "🎬 Random Anime Video",
            attachment: fs.createReadStream(filePath)
          },
          event.threadID,
          () => {
            try {
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            } catch (e) {
              console.log("Cleanup error:", e.message);
            }
          },
          event.messageID
        );
      } catch (e) {
        console.log("SEND ERROR:", e.message);
      }
    });

    writer.on("error", (err) => {
      console.log("WRITE ERROR:", err.message);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
      api.sendMessage(
        "❎ File write error occurred",
        event.threadID,
        event.messageID
      );
    });

  } catch (err) {
    console.log("ANIME ERROR:", err.message);
    return api.sendMessage(
      "❎ API error or network problem, try again later",
      event.threadID,
      event.messageID
    );
  }
};
