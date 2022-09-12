import { Client } from "@notionhq/client";
import TelegramBot from "node-telegram-bot-api";

require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const createTask = async (name: string, status: string) => {
  await notion.pages.create({
    parent: {
      database_id: process.env.DB_ID as string,
    },
    properties: {
      [process.env.NOTION_STATUS_FIELD as string]: {
        type: "status",
        status: { name: status },
      },
      [process.env.NOTION_NAME_FIELD as string]: {
        title: [{ text: { content: name } }],
        type: "title",
      },
    },
  });
};

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, {
  polling: true,
});

bot.on("message", (msg) => {
  if (
    !msg.reply_to_message?.text ||
    !msg.entities?.find((ent) => ent.type === "mention" && !ent.user)
  )
    return;
  createTask(
    msg.reply_to_message.text,
    process.env.NOTION_STATUS_NAME as string
  );
});
