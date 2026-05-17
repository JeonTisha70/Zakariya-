module.exports = {
  config: {
    name: "age",
    version: "2.2",
    author: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️ / JAKARIYA",
    hasPermission: 0,
    commandCategory: "utility",
    cooldowns: 5,
    description: "Calculate age from birth date (DD/MM/YYYY)"
  },

  run: async function ({ api, event, args }) {
    const fs = require("fs-extra");
    const moment = require("moment-timezone");
    const axios = require("axios");

    const threadID = event.threadID;
    const senderID = event.senderID;

    try {
      // ================= INPUT CHECK =================
      if (!args[0]) {
        return api.sendMessage(
          "⚠️ জন্ম তারিখ দিন (06/06/2004)\nউদাহরণ: age 06/06/2004",
          threadID
        );
      }

      const input = args[0].trim();
      const parts = input.split("/");

      if (parts.length !== 3) {
        return api.sendMessage("❌ Format ভুল! 04/06/2004 ব্যবহার করুন", threadID);
      }

      let [day, month, year] = parts.map(Number);

      if (
        isNaN(day) || day < 1 || day > 31 ||
        isNaN(month) || month < 1 || month > 12 ||
        isNaN(year) || year < 1000 || year > new Date().getFullYear()
      ) {
        return api.sendMessage("❌ Invalid date দেওয়া হয়েছে", threadID);
      }

      const birthDate = moment.tz(
        `${year}-${month}-${day}`,
        "YYYY-MM-DD",
        "Asia/Dhaka"
      );

      const now = moment.tz("Asia/Dhaka");

      if (birthDate.isAfter(now)) {
        return api.sendMessage("❌ ভবিষ্যতে জন্ম নেওয়া সম্ভব না 😄", threadID);
      }

      const duration = moment.duration(now.diff(birthDate));

      const years = duration.years();
      const months = duration.months();
      const days = duration.days();

      const totalMonths = years * 12 + months;
      const totalDays = Math.floor(duration.asDays());
      const totalHours = Math.floor(duration.asHours());

      // ================= CACHE SAFE =================
      const cacheDir = __dirname + "/cache";
      await fs.ensureDir(cacheDir);

      const avatarPath = `${cacheDir}/${senderID}.jpg`;

      const avatarUrl =
        `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;

      let attachment;

      try {
        const response = await axios.get(avatarUrl, {
          responseType: "arraybuffer",
          timeout: 10000
        });

        await fs.writeFile(avatarPath, response.data);

        attachment = fs.createReadStream(avatarPath);

      } catch (e) {
        console.log("Avatar error:", e.message);
        attachment = null;
      }

      // ================= MESSAGE =================
      const msg =
`┏━━━━━━━━━━━━━━━━❂
┃ 🎂 𝗔𝗚𝗘 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥 🎂
┣━━━━━━━━━━━━━━━━❂
┃ 📅 DOB: ${day}/${month}/${year}
┃ 🎯 Age: ${years} years ${months} months
┣━━━━[ DETAILS ]━━━━❂
┃ 📌 Months: ${totalMonths}
┃ 📌 Days: ${totalDays}
┃ 📌 Hours: ${totalHours}
┣━━━━━━━━━━━━━━━━❂
┃ 👤 Created by: JAKARIYA
┗━━━━━━━━━━━━━━━━❂`;

      await api.sendMessage(
        attachment ? { body: msg, attachment } : { body: msg },
        threadID
      );

      // ================= CLEANUP SAFE =================
      try {
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      } catch (e) {
        console.log("Cleanup error:", e.message);
      }

    } catch (error) {
      console.log("AGE COMMAND ERROR:", error.message);

      return api.sendMessage(
        "❌ কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন",
        event.threadID
      );
    }
  }
};
