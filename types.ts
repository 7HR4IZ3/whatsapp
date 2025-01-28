import makeWASocket from "@whiskeysockets/baileys";
import type { SocketConfig, WAProto } from "@whiskeysockets/baileys";
import type { WhatsappAuth } from "./auth/index";
import type { WhatsappStore } from "./store";

export type WhatsappSocket = ReturnType<typeof makeWASocket>;

export type WhatsappConfig = Omit<Partial<SocketConfig>, "auth"> & {
  auth: WhatsappAuth;
  store: WhatsappStore;
  reconnectOnClose?: boolean;
};

export interface WhatsappAuthCreds {
  me: {
    id: string;
    name: string;
    lid: string;
  };
  pairingEphemeralKeyPair: {
    private: Buffer;
    public: Buffer;
  };
  signedIdentityKey: {
    private: Buffer;
    public: Buffer;
  };
  noiseKey: {
    private: Buffer;
    public: Buffer;
  };
  advSecretKey: Buffer;
  registrationId: string;
  pairingCode: string;
  routingInfo: Buffer;
}

export interface WhatsappAuthKeys {
  get(
    type: "app-state-sync-key",
    ids: string[]
  ): Promise<Record<string, WAProto.Message.AppStateSyncKeyData>>;
  set(data: Record<string, WAProto.Message.AppStateSyncKeyData>): Promise<void>;
}

export type WhatappConnectionConfig = {
  reconnectOnClose: boolean;
}

export type ButtonReply = {
  text: string;
  id: string;
  index: number;
}
