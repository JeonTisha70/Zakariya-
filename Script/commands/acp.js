const moment = require("moment-timezone");

module.exports.config = {
  name: "acp",
  version: "3.0.1",
  hasPermission: 2, // spelling fix
  credits: "JAKARIYA",
  description: "Accept or delete Facebook friend requests",
  commandCategory: "System",
  usages: "acp",
  cooldowns: 5,
  usePrefix: true,
  dependencies: {
    "moment-timezone": ""
  }
};

module.exports.handleReply = async function ({ handleReply, event, api }) {
  try {
    if (!handleReply || !event?.body || !api) return;

    const { author, listRequest } = handleReply;

    if (String(author) !== String(event.senderID)) return;

    const body = event.body.trim().toLowerCase();
    const args = body.split(/\s+/);

    const action = args[0];
    let targets = args.slice(1);

    if (!action || !["add", "del"].includes(action)) {
      return api.sendMessage(
        "⚙️ Use:\nadd <number/all>\ndel <number/all>",
        event.threadID,
        event.messageID
      );
    }

    if (!targets.length) {
      return api.sendMessage(
        "❎ Please provide request number or all",
        event.threadID,
        event.messageID
      );
    }

    if (targets[0] === "all") {
      targets = listRequest.map((_, i) => String(i + 1));
    }

    const success = [];
    const failed = [];

    for (const t of targets) {
      const index = parseInt(t, 10) - 1;

      if (isNaN(index) || index < 0 || !listRequest[index]) {
        failed.push(`Invalid: ${t}`);
        continue;
      }

      const user = listRequest[index];

      try {
        const form = {
          av: api.getCurrentUserID(),
          fb_api_caller_class: "RelayModern",
          variables: JSON.stringify({
            input: {
              source: "friends_tab",
              actor_id: api.getCurrentUserID(),
              friend_requester_id: user.node.id,
              client_mutation_id: String(Math.floor(Math.random() * 9999999))
            },
            scale: 3,
            refresh_num: 0
          })
        };

        if (action === "add") {
          form.fb_api_req_friendly_name =
            "FriendingCometFriendRequestConfirmMutation";
          form.doc_id = "3147613905362928";
        } else {
          form.fb_api_req_friendly_name =
            "FriendingCometFriendRequestDeleteMutation";
          form.doc_id = "4108254489275063";
        }

        const response = await api.httpPost(
          "https://www.facebook.com/api/graphql/",
          form
        );

        let data;
        try {
          data = typeof response === "string"
            ? JSON.parse(response)
            : response;
        } catch {
          failed.push(user.node.name || "Unknown");
          continue;
        }

        if (data?.errors) {
          failed.push(user.node.name || "Unknown");
        } else {
          success.push(user.node.name || "Unknown");
        }

      } catch (e) {
        console.log("REQUEST ERROR:", e.message);
        failed.push(user.node.name || "Unknown");
      }
    }

    let msg = `✅ ${action === "add" ? "Accepted" : "Deleted"}: ${success.length}`;

    if (success.length) msg += `\n\n${success.join("\n")}`;
    if (failed.length) msg += `\n\n❎ Failed: ${failed.length}\n${failed.join("\n")}`;

    return api.sendMessage(msg, event.threadID, event.messageID);

  } catch (err) {
    console.log("HANDLE REPLY ERROR:", err.message);
    return api.sendMessage(
      "❎ Failed to process friend requests!",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function ({ event, api }) {
  try {
    const form = {
      av: api.getCurrentUserID(),
      fb_api_req_friendly_name:
        "FriendingCometFriendRequestsRootQueryRelayPreloader",
      fb_api_caller_class: "RelayModern",
      doc_id: "4499164963466303",
      variables: JSON.stringify({ input: { scale: 3 } })
    };

    const response = await api.httpPost(
      "https://www.facebook.com/api/graphql/",
      form
    );

    let data;
    try {
      data = typeof response === "string"
        ? JSON.parse(response)
        : response;
    } catch {
      return api.sendMessage(
        "❎ Invalid Facebook response!",
        event.threadID,
        event.messageID
      );
    }

    const list = data?.data?.viewer?.friending_possibilities?.edges || [];

    if (!list.length) {
      return api.sendMessage(
        "📭 No pending friend requests found.",
        event.threadID,
        event.messageID
      );
    }

    let msg = "👥 FRIEND REQUEST LIST 👥\n";

    list.forEach((item, i) => {
      const name = item?.node?.name || "Unknown";
      const uid = item?.node?.id || "Unknown";

      const url = item?.node?.url
        ? item.node.url.replace("www.facebook.com", "fb.com")
        : "No URL";

      const time = item?.time
        ? moment(item.time * 1000)
            .tz("Asia/Dhaka")
            .format("DD/MM/YYYY • HH:mm:ss")
        : "Unknown";

      msg += `\n━━━━━━━━━━━━━━━━━━`;
      msg += `\n${i + 1}. ${name}`;
      msg += `\n🆔 ${uid}`;
      msg += `\n🌐 ${url}`;
      msg += `\n⏰ ${time}\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━`;
    msg += `\n⚙️ Reply With: add 1 | del 1 | add all | del all`;

    return api.sendMessage(msg, event.threadID, (err, info) => {
      if (err || !info) return;

      if (!global.client.handleReply) {
        global.client.handleReply = [];
      }

      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        listRequest: list
      });
    });

  } catch (err) {
    console.log("ACP RUN ERROR:", err.message);
    return api.sendMessage(
      "❎ Failed to load friend requests!",
      event.threadID,
      event.messageID
    );
  }
};
