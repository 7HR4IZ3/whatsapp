import {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeWASocket,
  type AnyMessageContent,
  type MiscMessageGenerationOptions,
} from "@whiskeysockets/baileys";
import NodeCache from "node-cache";

import { WhatsappChats } from "./chats.js";
import { WhatsappStore } from "./store.js";
import { WhatsappAuth } from "./auth/index.js";
import { initialize, logger } from "./utils.js";
import { WhatsappMessages } from "./messages.js";
import { WhatappConnection as WhatsappConnection } from "./connection.js";

import type { WhatsappConfig, WhatsappSocket } from "./types";

export default class Whatsapp {
  #config: WhatsappConfig;
  #socket?: WhatsappSocket;

  #chats: WhatsappChats;
  #messages: WhatsappMessages;
  #connection: WhatsappConnection;

  constructor(config: Partial<WhatsappConfig> = {}) {
    this.#config = this.#getDefaultConfig(config);

    this.#connection = new WhatsappConnection(this);
    this.#messages = new WhatsappMessages(this);
    this.#chats = new WhatsappChats(this);
  }

  get socket() {
    this.#errorIfNotConnected();
    return this.#socket as WhatsappSocket;
  }

  get connection() {
    return this.#connection;
  }

  get chats() {
    return this.#chats;
  }

  get messages() {
    return this.#messages;
  }

  get user() {
    return this.socket.user;
  }

  #errorIfNotConnected() {
    if (!this.#socket) {
      throw new Error("[Whatsapp] Whatsapp not connected");
    }
  }

  #getDefaultConfig(config: Partial<WhatsappConfig>): WhatsappConfig {
    return {
      logger, reconnectOnClose: true,
      keepAliveIntervalMs: 24 * 60 * 60 * 1000,

      ...config,

      store: config.store ?? new WhatsappStore(),
      auth: config.auth ?? new WhatsappAuth(),
    };
  }

  #saveCredentials() {
    this.#config.auth.saveCreds();
  }

  async connect(number?: string) {
    const { version } = await fetchLatestBaileysVersion();
    await this.#config.auth.initialize();

    this.#socket = makeWASocket({
      printQRInTerminal: !number,
      ...this.#config,

      version,
      auth: this.#config.auth.state,
      msgRetryCounterCache: new NodeCache(),
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
        const msg = await this.#config.store.loadMessage(
          key.remoteJid!, key.id!
        );
        return msg?.message || undefined;
      },
    });

    this.#config.store.configure({
      client: this,
      savePath: number && `./whatsapp-${number}.store`,
    });

    this.#connection[initialize]();
    this.#messages[initialize]();

    this.#socket.ev.on("creds.update", this.#saveCredentials.bind(this));
    this.#socket.ev.on(
      "connection.update",
      ({ connection, lastDisconnect }) => {
        if (connection === "close") {
          const shouldReconnect =
            // @ts-ignore
            lastDisconnect?.error?.output?.statusCode !==
            DisconnectReason.loggedOut;

          if (shouldReconnect && this.#config.reconnectOnClose) {
            this.#restart();
          }
        }
      }
    );

    if (number && !this.#socket.authState.creds.registered) {
      return await this.#socket.requestPairingCode(number);
    }
  }

  async send(
    number: string,
    message: string | AnyMessageContent,
    options?: MiscMessageGenerationOptions & {
      modify?: (message: AnyMessageContent) => AnyMessageContent;
    }
  ) {
    const { modify, ...sendOptions } = options ?? {};
    message = typeof message === "string" ? { text: message } : message;
    return await this.socket.sendMessage(
      number.includes("@") ? number : `${number}@s.whatsapp.net`,
      modify?.(message) ?? message,
      sendOptions
    );
  }

  #restart() {
    console.log("[Whatsapp] Please restart the application...");
    this.connect();
  }
}
