import Whatsapp from "./index.js";
import { WhatsappStore } from "./store.js";

import fs from "node:fs/promises";

const whatsapp = new Whatsapp();

whatsapp.connection.on("close", () => {
  console.log("Client Closed.");
});

whatsapp.messages.watch(async (messages) => {
  for (const message of messages) {
    console.log(
      "[MESSAGE]: ",
      message.type,
      message.viewOnceV2,
      message.viewOnce
    );

    if (message.text === "ping") {
      await message.reply("pong");
      await message.react("👍");
    } else if (message.text === ".pin" && message.quoted) {
      await message.reply("📌 Pinned message");
      await message.quoted.pin();
    } else if (message.text === ".unpin" && message.quoted) {
      await message.reply("📌 Unpinned message");
      await message.quoted.unpin();
    } else if (message.text === ".delete" && message.quoted) {
      await message.reply("🗑 Deleted message");
      await message.quoted.delete();
    } else if (message.text?.startsWith(".viewonce")) {
      const [, limit, number] = message.text.split(" ");

      const { messages } = JSON.parse(
        await fs.readFile("./whatsapp.store", { encoding: "utf-8" })
      );

      const chats = Array.from<any>(messages["2349013934576@s.whatsapp.net"]);

      const viewOnce = (
        chats.filter(
          ({ message, key }) =>
            message &&
            key &&
            key.fromMe &&
            (message.viewOnceMessageV2 ||
              message.extendedTextMessage?.contextInfo?.quotedMessage
                ?.viewOnceMessageV2)
        ) as any[]
      )
        .reverse()
        .slice(0, limit ? parseInt(limit) : undefined);

      await Promise.all(
        viewOnce.map(async ({ key, message, ...extra }) => {
          const [viewOnceMessage, config] = message.viewOnceMessageV2
            ? [message.viewOnceMessageV2.message, {}]
            : message.extendedTextMessage?.contextInfo?.quotedMessage
                ?.viewOnceMessageV2.message
            ? [
                message.extendedTextMessage?.contextInfo?.quotedMessage
                  ?.viewOnceMessageV2.message,
                { quoted: true },
              ]
            : [undefined, {}];

          if (!viewOnceMessage) return;

          if (viewOnceMessage.imageMessage?.viewOnce) {
            viewOnceMessage.imageMessage.viewOnce = false;
          }
          if (viewOnceMessage.videoMessage?.viewOnce) {
            viewOnceMessage.videoMessage.viewOnce = false;
          }

          if (config.quoted) {
            await whatsapp.send(number ?? "2349153851370", {
              forward: {
                key,
                message: {
                  ...viewOnceMessage,
                  messageContextInfo: extra.messageContextInfo,
                },
              },
            });
          } else {
            await whatsapp.send(number ?? "2349153851370", {
              forward: {
                key,
                ...extra,
                message: viewOnceMessage,
              },
            });
          }
        })
      );
    } else if (message.viewOnceV2 || message.viewOnce) {
      const item = message.viewOnceV2 || message.viewOnce;
      if (item) {
        if (item.image) {
          await message.forwardTo("2349153851370", {
            modify(message) {
              return {
                ...message,
                message: {
                  imageMessage: {
                    ...item.image,
                    viewOnce: false,
                  },
                },
              };
            },
          });
        }
      }
    } else if (message.text === ".profile") {
      await message.reply(
        `Hello ${whatsapp.user!.name}`
      );
    } else if (message.text?.startsWith(".react") && message.quoted) {
      await message.quoted.react(message.text.split(" ")[1]);
    }
  }
});

const chat = whatsapp.chats.get("2349013934576");
chat.messages.on("message", async ({message}) => {
  if (message.text === "ping") {
    await chat.send("pong");
  }

  if (message.viewOnce?.image) {
    await message.forwardTo("", {
      modify: m => ({
        ...m,
        message: {
          imageMessage: {
            ...message.viewOnce?.image,
            viewOnce: false,
          },
        },
      }),
    });
  }
});

await whatsapp.connect();
