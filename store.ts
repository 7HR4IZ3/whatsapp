import { makeInMemoryStore } from "@whiskeysockets/baileys";
import type { WhatsappSocket } from "./types";
import type Whatsapp from ".";

type WhatsappStoreConfig = {
  savePath?: string;
  saveInterval?: number;
  client?: Whatsapp;
};

export class WhatsappStore {
  private client?: Whatsapp;
  private interval?: NodeJS.Timer;
  private store: ReturnType<typeof makeInMemoryStore>;

  constructor(config?: Omit<WhatsappStoreConfig, "socket">) {
    this.store = makeInMemoryStore({});
    this.configure(config);
  }

  configure({ client, savePath, saveInterval }: WhatsappStoreConfig = {}) {
    if (client) {
      this.client = client;
      this.store.bind(client.socket.ev);
    }

    this.store.readFromFile(savePath || "./whatsapp.store");

    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.store.writeToFile(savePath || "./whatsapp.store");
    }, (saveInterval || 10) * 1000);
  }

  loadMessage(jid: string, id: string) {
    return this.store.loadMessage(jid, id);
  }
}
