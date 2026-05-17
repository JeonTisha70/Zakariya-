
const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "admin",
  version: "1.1.0",
  hasPermission: 0,
  credits: "ZAKARIYA",
  description: "Show Owner Info",
  commandCategory: "info",
  usages: "admin",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  const time = moment()
    .tz("Asia/Dhaka")
    .format("DD/MM/YYYY hh:mm:ss A");

  const cachePath = __dirname + "/cache/owner.jpg";

  const msg = `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐚𝐦𝐞 : 𝐙𝐚𝐤𝐚𝐫𝐢𝐲𝐚 𝐈𝐬𝐥𝐚𝐦
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : 𝐌𝐚𝐥𝐞
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : 𝐒𝐢𝐧𝐠𝐥𝐞
│ 🎂 𝐀𝐠𝐞 : 𝟐𝟐+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : 𝐈𝐬𝐥𝐚𝐦
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝐇𝐒𝐂 (𝟐𝟎𝟐𝟐)
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : 𝐑𝐚𝐧𝐠𝐩𝐮𝐫
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 Facebook:
│ https://fb.com/61583600763759
│ 💬 WhatsApp:
│ https://wa.me/01908488295
└───────────────⭓

┌───────────────⭓
│ 🕒 Updated Time
├───────────────
│ ${time}
└───────────────⭓
`;

  try {
    // ensure cache folder exists
    await fs.ensureDir(__dirname + "/cache");

    // image download (safe axios)
    const imageUrl = "https://i.imgur.com/idyXtoO.jpeg";

    const res = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 10000
    });

    await fs.writeFile(cachePath, res.data);

    return api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(cachePath)
      },
      threadID,
      async () => {
        try {
          await fs.unlink(cachePath);
        } catch (e) {
          console.log("Cleanup error:", e.message);
        }
      },
      messageID
    );

  } catch (err) {
    console.log("ADMIN CMD ERROR:", err.message);

    return api.sendMessage(
      "❎ Error loading owner info. Please try again later.",
      threadID,
      messageID
    );
  }
};
