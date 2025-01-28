import type {
  AnyMessageContent,
  MiscMessageGenerationOptions,
  proto,
} from "@whiskeysockets/baileys";

import type Whatsapp from ".";
import type { WhatsappMessage } from "./messages";

export class ChatMessage {
  constructor(
    private client: Whatsapp,
    public jid: string,
    public message: WhatsappMessage
  ) {}

  async reply(message: AnyMessageContent) {
    return this.message.reply(message);
  }

  async forward(
    number: string,
    options?: MiscMessageGenerationOptions & {
      modify?: (
        message: Partial<proto.IWebMessageInfo>
      ) => Partial<proto.IWebMessageInfo>;
    }
  ) {
    return this.message.forwardTo(number, options);
  }

  async react(emoji: string) {
    return this.message.react(emoji);
  }
}

export class ChatMessages {
  constructor(private client: Whatsapp, private jid: string) {}

  async watch(callback: (messages: ChatMessage[]) => void) {
    this.client.messages.watch(async (messages) => {
      callback(
        messages
          .filter((message) => message.key?.participant === this.jid)
          .map((message) => new ChatMessage(this.client, this.jid, message))
      );
    });
  }

  on(event: "message", callback: (message: ChatMessage) => void) {
    this.client.messages.on(event, async (message) => {
      if (message.key?.participant === this.jid) {
        callback(new ChatMessage(this.client, this.jid, message));
      }
    });
  }
}

export class Chat {
  messages: ChatMessages;

  constructor(private client: Whatsapp, private jid: string) {
    this.messages = new ChatMessages(this.client, this.jid);
  }

  async send(message: string | AnyMessageContent) {
    return this.client.send(this.jid, message);
  }
}

export class WhatsappChats {
  constructor(private client: Whatsapp) {
  }

  get(number: string) {
    return new Chat(
      this.client,
      number.includes("@")
        ? number : `${number}@s.whatsapp.net`
    );
  }
}
