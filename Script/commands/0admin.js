
const { writeFileSync, existsSync, mkdirSync } = require("fs-extra");
const { resolve } = require("path");

module.exports.config = {
  name: "0admin",
  version: "2.0.1",
  hasPermssion: 2,
  credits: "JAKARIYA",
  description: "Jakariya Admin Management System",
  commandCategory: "Admin",
  usages: "[list/add/remove/only/boxonly]",
  cooldowns: 3,
  usePrefix: true,
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.languages = {
  en: {
    listAdmin: "👑 JAKARIYA ADMIN LIST 👑\n\n%1",
    noPermission: "❎ You don't have permission to use \"%1\"",
    addedAdmin: "✅ Added %1 admin(s):\n\n%2",
    removedAdmin: "✅ Removed %1 admin(s):\n\n%2",
    adminOnlyOn: "🔓 Admin-only mode enabled",
    adminOnlyOff: "✅ Admin-only mode disabled",
    boxOnlyOn: "🔓 Group admin-only mode enabled",
    boxOnlyOff: "✅ Group admin-only mode disabled",
    noAdmin: "⚠️ No admin found",
    invalidUID: "⚠️ Please reply, mention, or enter a valid UID"
  }
};

module.exports.onLoad = () => {
  const cachePath = resolve(__dirname, "cache");

  if (!existsSync(cachePath)) {
    mkdirSync(cachePath, { recursive: true });
  }

  const dataPath = resolve(cachePath, "data.json");

  if (!existsSync(dataPath)) {
    writeFileSync(
      dataPath,
      JSON.stringify(
        {
          adminbox: {}
        },
        null,
        4
      )
    );
  }
};

module.exports.run = async function ({
  api,
  event,
  args,
  Users,
  permssion,
  getText
}) {
  try {
    const { threadID, messageID, mentions } = event;
    const mentionIDs = Object.keys(mentions);
    const content = args.slice(1);

    const { configPath } = global.client;

    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    if (!config.ADMINBOT) config.ADMINBOT = [];

    const ADMINBOT = config.ADMINBOT;

    const getUIDs = () => {
      if (event.type === "message_reply") {
        return [event.messageReply.senderID];
      }

      if (mentionIDs.length > 0) {
        return mentionIDs;
      }

      if (content[0] && !isNaN(content[0])) {
        return [content[0]];
      }

      return [];
    };

    switch ((args[0] || "").toLowerCase()) {

      case "list":
      case "all": {
        if (ADMINBOT.length === 0) {
          return api.sendMessage(
            getText("noAdmin"),
            threadID,
            messageID
          );
        }

        const msg = [];

        for (const id of ADMINBOT) {
          try {
            const user = await Users.getData(id);
            const name = user.name || "Unknown User";

            msg.push(`• ${name}\n🌐 https://facebook.com/${id}`);
          } catch {
            msg.push(`• Unknown User\n🌐 https://facebook.com/${id}`);
          }
        }

        return api.sendMessage(
          getText("listAdmin", msg.join("\n\n")),
          threadID,
          messageID
        );
      }

      case "add": {
        if (permssion != 3) {
          return api.sendMessage(
            getText("noPermission", "add"),
            threadID,
            messageID
          );
        }

        const ids = getUIDs();

        if (ids.length === 0) {
          return api.sendMessage(
            getText("invalidUID"),
            threadID,
            messageID
          );
        }

        const added = [];

        for (const id of ids) {
          if (!ADMINBOT.includes(id)) {
            ADMINBOT.push(id);

            try {
              const user = await Users.getData(id);
              const name = user.name || "Unknown User";

              added.push(`• ${name} (${id})`);
            } catch {
              added.push(`• ${id}`);
            }
          }
        }

        writeFileSync(configPath, JSON.stringify(config, null, 4));

        return api.sendMessage(
          getText("addedAdmin", added.length, added.join("\n")),
          threadID,
          messageID
        );
      }

      case "remove":
      case "rm": {
        if (permssion != 3) {
          return api.sendMessage(
            getText("noPermission", "remove"),
            threadID,
            messageID
          );
        }

        const ids = getUIDs();

        if (ids.length === 0) {
          return api.sendMessage(
            getText("invalidUID"),
            threadID,
            messageID
          );
        }

        const removed = [];

        for (const id of ids) {
          const index = ADMINBOT.indexOf(id);

          if (index !== -1) {
            ADMINBOT.splice(index, 1);

            try {
              const user = await Users.getData(id);
              const name = user.name || "Unknown User";

              removed.push(`• ${name} (${id})`);
            } catch {
              removed.push(`• ${id}`);
            }
          }
        }

        writeFileSync(configPath, JSON.stringify(config, null, 4));

        return api.sendMessage(
          getText("removedAdmin", removed.length, removed.join("\n")),
          threadID,
          messageID
        );
      }

      case "only": {
        if (permssion != 3) {
          return api.sendMessage(
            getText("noPermission", "only"),
            threadID,
            messageID
          );
        }

        config.adminOnly = !config.adminOnly;

        writeFileSync(configPath, JSON.stringify(config, null, 4));

        return api.sendMessage(
          config.adminOnly
            ? getText("adminOnlyOn")
            : getText("adminOnlyOff"),
          threadID,
          messageID
        );
      }

      case "boxonly": {
        if (permssion != 3) {
          return api.sendMessage(
            getText("noPermission", "boxonly"),
            threadID,
            messageID
          );
        }

        const dataPath = resolve(__dirname, "cache", "data.json");

        delete require.cache[require.resolve(dataPath)];

        const database = require(dataPath);

        if (!database.adminbox) {
          database.adminbox = {};
        }

        database.adminbox[threadID] =
          !database.adminbox[threadID];

        writeFileSync(
          dataPath,
          JSON.stringify(database, null, 4)
        );

        return api.sendMessage(
          database.adminbox[threadID]
            ? getText("boxOnlyOn")
            : getText("boxOnlyOff"),
          threadID,
          messageID
        );
      }

      default: {
        return api.sendMessage(
          "⚙️ Use:\n• 0admin list\n• 0admin add @tag\n• 0admin remove @tag\n• 0admin only\n• 0admin boxonly",
          threadID,
          messageID
        );
      }
    }
  } catch (error) {
    console.log(error);

    return api.sendMessage(
      "❎ System Error: " + error.message,
      event.threadID,
      event.messageID
    );
  }
};
