import {
  initAuthCreds,
  makeCacheableSignalKeyStore,
  WAProto,
  type AuthenticationCreds,
  type AuthenticationState,
} from "@whiskeysockets/baileys";
import { WhatsappAuthStore } from "./store.js";
import { logger } from "../utils.js";

export class WhatsappAuthState {
  private _store: WhatsappAuthStore;
  private _creds?: AuthenticationCreds;

  constructor(store?: WhatsappAuthStore) {
    this._creds = undefined;
    this._store = store || new WhatsappAuthStore();
  }

  async initialize(creds?: AuthenticationCreds) {
    this._creds = creds;
    if (!this._creds) {
      this._creds = initAuthCreds();
    }
  }

  get creds(): AuthenticationCreds {
    if (!this._creds) {
      throw new Error("[AuthState] State not initialized");
    }

    return this._creds;
  }

  get keys(): AuthenticationState["keys"] {
    return makeCacheableSignalKeyStore({
      // @ts-ignore
      get: async (category, ids) => {
        const data: Record<string, WAProto.Message.AppStateSyncKeyData> = {};
        await Promise.all(
          ids.map(async (id) => {
            let value = (await this._store.get(
              `${category}-${id}`
            )) as WAProto.Message.AppStateSyncKeyData;
            if (category === "app-state-sync-key" && value) {
              value = WAProto.Message.AppStateSyncKeyData.fromObject(value);
            }
            data[id] = value;
          })
        );
        return data;
      },
      set: async (data) => {
        const tasks = [];
        for (const category in data) {
          // @ts-ignore
          for (const id in data[category]) {
            // @ts-ignore
            const value = data[category][id];
            const file = `${category}-${id}`;
            tasks.push(
              value ? this._store.set(file, value) : this._store.delete(file)
            );
          }
        }
        await Promise.all(tasks);
      },
    }, logger);
  }
}
