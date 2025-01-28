import { WhatsappAuthState } from "./state.js";
import { WhatsappAuthStore, FilesystemAuthStore } from "./store.js";

import type { AuthenticationCreds } from "@whiskeysockets/baileys";

export interface WhatsappAuthConfig {
  credentialKey?: string;
  store?: WhatsappAuthStore;
}

export class WhatsappAuth {
  #state: WhatsappAuthState;
  #store: WhatsappAuthStore;
  #config: WhatsappAuthConfig;

  constructor(config?: WhatsappAuthConfig) {
    this.#config = config ?? {};
    this.#store = this.#config.store ?? new FilesystemAuthStore();
    this.#state = new WhatsappAuthState(this.#store);
  }

  get state() {
    return this.#state;
  }

  async initialize() {
    await this.#state.initialize(
      await this.#store.get(
        this.#config.credentialKey
          ?? "credentials"
      ) as AuthenticationCreds
    );
  }

  async saveCreds() {
    await this.#store.set(
      this.#config.credentialKey
        ?? "credentials",
      this.#state.creds
    );
  }
}
