import EventEmitter from "node:events";
import { initialize } from "./utils.js";

import type Whatsapp from ".";
import type { ConnectionState } from "@whiskeysockets/baileys";
import type { WhatappConnectionConfig, WhatsappSocket } from "./types";

export class WhatappConnection extends EventEmitter {
  #config: WhatappConnectionConfig;

  constructor(private client: Whatsapp) {
    super();

    this.#config = {
      reconnectOnClose: false,
    };
  }

  configure(config: Partial<WhatappConnectionConfig>) {
    this.#config = {
      ...this.#config,
      ...config,
    };
  }

  on(
    event: "open" | "close",
    listener: (update: ConnectionState) => void
  ): this;
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  [initialize]() {
    this.client.socket.ev.on("connection.update", (update) => {
      const { connection } = update;
      if (connection === "close") {
        this.emit("close", update);
      } else if (connection === "open") {
        this.emit("open", update);
      }
    });
  }
}
