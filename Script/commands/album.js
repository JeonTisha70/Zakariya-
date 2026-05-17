
const axios = require("axios");
const path = require("path");
const fs = require("fs-extra");

const baseApiUrl = async () => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json",
      { timeout: 10000 }
    );
    return res.data?.api;
  } catch (e) {
    console.log("BaseAPI error:", e.message);
    return null;
  }
};

module.exports.config = {
  name: "album",
  version: "1.1.0",
  hasPermission: 0,
  credits: "Dipto Modified By JIYEM / JAKARIYA FIX",
  description: "Album video system",
  commandCategory: "Media",
  usages: "album",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  try {
    await fs.ensureDir(__dirname + "/cache");

    // ================= MENU =================
    if (!args[0]) {
      api.setMessageReaction("😘", messageID, () => {}, true);

      const albumOptions = [
        "𝗙𝘂𝗻𝗻𝘆 𝘃𝗶𝗱𝗲𝗼",
        "𝗜𝘀𝗹𝗮𝗺𝗶𝗰 𝘃𝗶𝗱𝗲𝗼",
        "𝗦𝗮𝗱 𝘃𝗶𝗱𝗲𝗼",
        "𝗔𝗻𝗶𝗺𝗲 𝘃𝗶𝗱𝗲𝗼",
        "𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘃𝗶𝗱𝗲𝗼",
        "𝗟𝗼𝗙𝗶 𝗩𝗶𝗱𝗲𝗼",
        "𝗛𝗼𝗿𝗻𝘆 𝘃𝗶𝗱𝗲𝗼",
        "𝗖𝗼𝘂𝗽𝗹𝗲 𝗩𝗶𝗱𝗲𝗼",
        "𝗙𝗹𝗼𝘄𝗲𝗿 𝗩𝗶𝗱𝗲𝗼",
        "𝗥𝗮𝗻𝗱𝗼𝗺 𝗣𝗵𝗼𝘁𝗼",
        "𝗔𝗲𝘀𝘁𝗵𝗲𝘁𝗶𝗰 𝗩𝗶𝗱𝗲𝗼",
        "𝗦𝗶𝗴𝗺𝗮 𝗥𝘂𝗹𝗲",
        "𝗟𝘆𝗿𝗶𝗰𝘀 𝗩𝗶𝗱𝗲𝗼",
        "𝗖𝗮𝘁 𝗩𝗶𝗱𝗲𝗼",
        "18+ 𝘃𝗶𝗱𝗲𝗼",
        "𝗙𝗿𝗲𝗲 𝗙𝗶𝗿𝗲 𝘃𝗶𝗱𝗲𝗼",
        "𝗙𝗼𝗼𝘁𝗯𝗮𝗹𝗹 𝘃𝗶𝗱𝗲𝗼",
        "𝗚𝗶𝗿𝗹 𝘃𝗶𝗱𝗲𝗼",
        "𝗙𝗿𝗶𝗲𝗻𝗱𝘀 𝗩𝗶𝗱𝗲𝗼",
        "𝗖𝗿𝗶𝗰𝗸𝗲𝘁 𝘃𝗶𝗱𝗲𝗼"
      ];

      const message =
`╔══════════════════════╗
║ 🎵 𝗔𝗹𝗯𝘂𝗺 𝗩𝗶𝗱𝗲𝗼 𝗟𝗶𝘀𝘁 🎶
╠══════════════════════╣
║ 01 Funny
║ 02 Islamic
║ 03 Sad
║ 04 Anime
║ 05 Cartoon
║ 06 LoFi
║ 07 Horny
║ 08 Couple
║ 09 Flower
║ 10 Random Photo
║ 11 Aesthetic
║ 12 Sigma
║ 13 Lyrics
║ 14 Cat
║ 15 18+
║ 16 Free Fire
║ 17 Football
║ 18 Girl
║ 19 Friends
║ 20 Cricket
╠══════════════════════╣
║ Reply with number (1-20)
╚══════════════════════╝`;

      return api.sendMessage(
        { body: message },
        threadID,
        (err, info) => {
          if (!global.client.handleReply) global.client.handleReply = [];

          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            albumOptions
          });
        },
        messageID
      );
    }

    // ================= ADD MEDIA =================
    const type = (args[1] || "").toLowerCase();

    const validCommands = [
      "cartoon","photo","lofi","sad","islamic","funny","horny",
      "anime","love","lyrics","sigma","aesthetic","cat","flower",
      "ff","sex","football","girl","friend","cricket"
    ];

    if (!validCommands.includes(type)) return;

    if (!event.messageReply?.attachments?.length) {
      return api.sendMessage("❎ Please reply to a media file", threadID);
    }

    const baseApi = await baseApiUrl();
    if (!baseApi) {
      return api.sendMessage("❎ API not working", threadID);
    }

    const fileUrl = event.messageReply.attachments[0].url;

    const driveRes = await axios.get(
      `${baseApi}/drive?url=${encodeURIComponent(fileUrl)}`,
      { timeout: 15000 }
    );

    const mediaUrl = driveRes.data?.fileUrl;
    if (!mediaUrl) return api.sendMessage("❎ Upload failed", threadID);

    const ext = path.extname(mediaUrl);

    const query = [
      "cartoon","photo","lofi","sad","islamic","funny","horny",
      "anime","love","lyrics","sigma","aesthetic","cat","flower",
      "ff","sex","football","girl","friend","cricket"
    ].includes(type)
      ? type
      : "photo";

    const albumRes = await axios.get(
      `${baseApi}/album?add=${query}&url=${mediaUrl}`
    );

    return api.sendMessage(
      `✅ ${albumRes.data?.data || "Done"}`,
      threadID,
      messageID
    );

  } catch (err) {
    console.log("ALBUM ERROR:", err.message);
    return api.sendMessage(
      "❎ Something went wrong in album system",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (!handleReply) return;

    const choice = parseInt(event.body);
    if (isNaN(choice) || choice < 1 || choice > 20) {
      return api.sendMessage("❎ Reply 1-20 number", event.threadID);
    }

    const map = {
      1: "funny",
      2: "islamic",
      3: "sad",
      4: "anime",
      5: "cartoon",
      6: "lofi",
      7: "horny",
      8: "love",
      9: "flower",
      10: "photo",
      11: "aesthetic",
      12: "sigma",
      13: "lyrics",
      14: "cat",
      15: "sex",
      16: "ff",
      17: "football",
      18: "girl",
      19: "friend",
      20: "cricket"
    };

    const type = map[choice];
    if (!type) return;

    const baseApi = await baseApiUrl();
    if (!baseApi) return;

    const res = await axios.get(`${baseApi}/album?type=${type}`);

    return api.sendMessage(
      { body: "Here is your video 🎬\n" + type },
      event.threadID,
      event.messageID
    );

  } catch (e) {
    console.log("REPLY ERROR:", e.message);
  }
};
