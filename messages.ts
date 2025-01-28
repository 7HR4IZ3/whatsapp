import EventEmitter from "node:events";
import { wrapMessage, getMessageType, initialize } from "./utils.js";

import type { ButtonReply } from "./types";
import type {
  WAProto,
  WAMessageUpdate,
  AnyMessageContent,
  MiscMessageGenerationOptions,
  proto,
} from "@whiskeysockets/baileys";
import type Whatsapp from "./index.js";

export class WhatsappMessage {
  constructor(
    private client: Whatsapp,
    private message: Partial<WAProto.IWebMessageInfo>
  ) {
    console.log(this.message);
  }

  get originalMessage() {
    return this.message;
  }

  get key() {
    if (this.message.key) return this.message.key;
    if (this.message.message?.extendedTextMessageWithParentKey?.key)
      return this.message.message.extendedTextMessageWithParentKey.key;

    if (this.extendedText?.contextInfo?.placeholderKey)
      return this.extendedText.contextInfo.placeholderKey;

    if (
      this.type &&
      (this.type === "image" ||
        this.type === "audio" ||
        this.type === "video" ||
        this.type === "document")
    ) {
      const msg = this[this.type];
      if (msg?.contextInfo?.placeholderKey) {
        return msg.contextInfo.placeholderKey;
      }
    }

    throw new Error("Message key not found");
  }

  get text() {
    return (
      this.message.message?.conversation ||
      this.message.message?.extendedTextMessage?.text
    );
  }

  get type() {
    return getMessageType(this.message.message);
  }

  get extendedText() {
    return wrapMessage("text", this.message.message?.extendedTextMessage);
  }

  get image() {
    return wrapMessage("image", this.message.message?.imageMessage);
  }

  get audio() {
    return wrapMessage("audio", this.message.message?.audioMessage);
  }

  get video() {
    return wrapMessage("video", this.message.message?.videoMessage);
  }

  get document() {
    return wrapMessage("document", this.message.message?.documentMessage);
  }

  get contacts() {
    return wrapMessage("contacts", this.message.message?.contactsArrayMessage);
  }

  get contact() {
    return wrapMessage("contact", this.message.message?.contactMessage);
  }

  get location() {
    return wrapMessage("location", this.message.message?.locationMessage);
  }

  get protocol() {
    return wrapMessage("protocol", this.message.message?.protocolMessage);
  }

  get template() {
    return wrapMessage("template", this.message.message?.templateMessage);
  }

  get sticker() {
    return wrapMessage("sticker", this.message.message?.stickerMessage);
  }

  get reaction() {
    return wrapMessage("reaction", this.message.message?.reactionMessage);
  }

  get senderKeyDistribution() {
    return wrapMessage(
      "senderKeyDistribution",
      this.message.message?.senderKeyDistributionMessage
    );
  }

  get highlyStructured() {
    return wrapMessage(
      "highlyStructured",
      this.message.message?.highlyStructuredMessage
    );
  }

  get fastRatchetKeySenderKeyDistribution() {
    return wrapMessage(
      "fastRatchetKeySenderKeyDistributionMessage",
      this.message.message?.fastRatchetKeySenderKeyDistributionMessage
    );
  }

  get sendPayment() {
    return wrapMessage("sendPayment", this.message.message?.sendPaymentMessage);
  }

  get liveLocation() {
    return wrapMessage(
      "liveLocation",
      this.message.message?.liveLocationMessage
    );
  }

  get requestPayment() {
    return wrapMessage(
      "requestPayment",
      this.message.message?.requestPaymentMessage
    );
  }

  get declinePaymentRequest() {
    return wrapMessage(
      "declinePaymentRequest",
      this.message.message?.declinePaymentRequestMessage
    );
  }

  get cancelPaymentRequest() {
    return wrapMessage(
      "cancelPaymentRequest",
      this.message.message?.cancelPaymentRequestMessage
    );
  }

  get groupInvite() {
    return wrapMessage("groupInvite", this.message.message?.groupInviteMessage);
  }

  get templateButtonReply() {
    return wrapMessage(
      "templateButtonReply",
      this.message.message?.templateButtonReplyMessage
    );
  }

  get product() {
    return wrapMessage("product", this.message.message?.productMessage);
  }

  get list() {
    return wrapMessage("list", this.message.message?.listMessage);
  }

  get order() {
    return wrapMessage("order", this.message.message?.orderMessage);
  }

  get deviceSent() {
    return wrapMessage("deviceSent", this.message.message?.deviceSentMessage);
  }

  get listResponse() {
    return wrapMessage(
      "listResponse",
      this.message.message?.listResponseMessage
    );
  }

  get ephemeral() {
    return wrapMessage("ephemeral", this.message.message?.ephemeralMessage);
  }

  get invoice() {
    return wrapMessage("invoice", this.message.message?.invoiceMessage);
  }

  get buttons() {
    return wrapMessage("buttons", this.message.message?.buttonsMessage);
  }

  get buttonsResponse() {
    return wrapMessage(
      "buttonsResponse",
      this.message.message?.buttonsResponseMessage
    );
  }

  get paymentInvite() {
    return wrapMessage(
      "paymentInvite",
      this.message.message?.paymentInviteMessage
    );
  }

  get interactive() {
    return wrapMessage("interactive", this.message.message?.interactiveMessage);
  }

  get stickerSyncRmr() {
    return wrapMessage(
      "stickerSyncRmr",
      this.message.message?.stickerSyncRmrMessage
    );
  }

  get interactiveResponse() {
    return wrapMessage(
      "interactiveResponse",
      this.message.message?.interactiveResponseMessage
    );
  }

  get pollCreation() {
    return wrapMessage(
      "pollCreation",
      this.message.message?.pollCreationMessage
    );
  }

  get pollUpdate() {
    return wrapMessage("pollUpdate", this.message.message?.pollUpdateMessage);
  }

  get keepInChat() {
    return wrapMessage("keepInChat", this.message.message?.keepInChatMessage);
  }

  get documentWithCaption() {
    return wrapMessage(
      "documentWithCaption",
      this.message.message?.documentWithCaptionMessage
    );
  }

  get requestPhoneNumber() {
    return wrapMessage(
      "requestPhoneNumber",
      this.message.message?.requestPhoneNumberMessage
    );
  }

  get encReaction() {
    return wrapMessage("encReaction", this.message.message?.encReactionMessage);
  }

  get edited() {
    return wrapMessage("edited", this.message.message?.editedMessage);
  }

  get viewOnceV2Extension() {
    return wrapMessage(
      "viewOnceV2Extension",
      this.message.message?.viewOnceMessageV2Extension
    );
  }

  get pollCreationV2() {
    return wrapMessage(
      "pollCreationV2",
      this.message.message?.pollCreationMessageV2
    );
  }

  get scheduledCallCreation() {
    return wrapMessage(
      "scheduledCallCreation",
      this.message.message?.scheduledCallCreationMessage
    );
  }

  get groupMentioned() {
    return wrapMessage(
      "groupMentioned",
      this.message.message?.groupMentionedMessage
    );
  }

  get pinInChat() {
    return wrapMessage("pinInChat", this.message.message?.pinInChatMessage);
  }

  get pollCreationV3() {
    return wrapMessage(
      "pollCreationV3",
      this.message.message?.pollCreationMessageV3
    );
  }

  get scheduledCallEdit() {
    return wrapMessage(
      "scheduledCallEdit",
      this.message.message?.scheduledCallEditMessage
    );
  }

  get ptv() {
    return wrapMessage("ptv", this.message.message?.ptvMessage);
  }

  get botInvoke() {
    return wrapMessage("botInvoke", this.message.message?.botInvokeMessage);
  }

  get callLog() {
    return wrapMessage("callLog", this.message.message?.callLogMesssage);
  }

  get encComment() {
    return wrapMessage("encComment", this.message.message?.encCommentMessage);
  }

  get lottieSticker() {
    return wrapMessage(
      "lottieSticker",
      this.message.message?.lottieStickerMessage
    );
  }

  get event() {
    return wrapMessage("event", this.message.message?.eventMessage);
  }

  get comment() {
    return wrapMessage("comment", this.message.message?.commentMessage);
  }

  get newsletterAdminInvite() {
    return wrapMessage(
      "newsletterAdminInvite",
      this.message.message?.newsletterAdminInviteMessage
    );
  }

  get placeholder() {
    return wrapMessage("placeholder", this.message.message?.placeholderMessage);
  }

  get encEventUpdate() {
    return wrapMessage(
      "encEventUpdate",
      this.message.message?.encEventUpdateMessage
    );
  }

  get viewOnce(): WhatsappMessage | null {
    if (!this.message.message?.viewOnceMessage) return null;
    return new WhatsappMessage(
      this.client,
      this.message.message?.viewOnceMessage
    );
  }

  get viewOnceV2(): WhatsappMessage | null {
    if (!this.message.message?.viewOnceMessageV2) return null;
    return new WhatsappMessage(
      this.client,
      this.message.message?.viewOnceMessageV2
    );
  }

  get quoted(): WhatsappMessage | null {
    if (this.viewOnce?.quoted) {
      return this.viewOnce.quoted;
    }

    if (this.viewOnceV2?.quoted) {
      return this.viewOnceV2.quoted;
    }

    const message =
      this.extendedText?.contextInfo?.quotedMessage ||
      this.image?.contextInfo?.quotedMessage ||
      this.video?.contextInfo?.quotedMessage ||
      this.audio?.contextInfo?.quotedMessage ||
      this.document?.contextInfo?.quotedMessage ||
      this.sticker?.contextInfo?.quotedMessage ||
      this.contacts?.contextInfo?.quotedMessage ||
      this.location?.contextInfo?.quotedMessage ||
      this.liveLocation?.contextInfo?.quotedMessage ||
      this.template?.contextInfo?.quotedMessage ||
      this.product?.contextInfo?.quotedMessage ||
      this.list?.contextInfo?.quotedMessage ||
      this.listResponse?.contextInfo?.quotedMessage ||
      this.event?.contextInfo?.quotedMessage ||
      this.groupInvite?.contextInfo?.quotedMessage ||
      this.templateButtonReply?.contextInfo?.quotedMessage ||
      this.interactive?.contextInfo?.quotedMessage ||
      this.interactiveResponse?.contextInfo?.quotedMessage ||
      this.pollCreation?.contextInfo?.quotedMessage ||
      this.pollCreationV3?.contextInfo?.quotedMessage;

    if (!message) return null;

    return new WhatsappMessage(this.client, { message });
  }

  get reactions() {
    return this.message.reactions?.map((reaction) => ({
      text: reaction.text,
      author: reaction.key?.participant,
    }));
  }

  #ensureMessage() {
    if (!this.message) {
      throw new Error("Message not found");
    }
  }

  async reply(
    reply: string | AnyMessageContent,
    options?: MiscMessageGenerationOptions
  ) {
    if (!this.message?.key?.remoteJid) {
      throw new Error("Cannot reply to this message");
    }

    const message = await this.client.socket.sendMessage(
      this.message.key.remoteJid,
      typeof reply === "string" ? { text: reply } : reply,
      options
    );
    if (!message) throw new Error("Failed to send message");

    return new WhatsappMessage(this.client, message);
  }

  async forwardTo(
    number: string,
    options?: MiscMessageGenerationOptions & {
      modify?: (
        message: Partial<WAProto.IWebMessageInfo>
      ) => Partial<WAProto.IWebMessageInfo>;
    }
  ) {
    const { modify, ...sendOptions } = options ?? {};
    const message = await this.client.socket.sendMessage(
      number.includes("@") ? number : `${number}@s.whatsapp.net`,
      {
        forward: (modify?.(this.message) ??
          this.message) as WAProto.IWebMessageInfo,
      },
      sendOptions
    );
    if (!message) throw new Error("Failed to send message");

    return new WhatsappMessage(this.client, message);
  }

  async react(emoji: string) {
    return this.reply({
      react: {
        key: this.message.key,
        text: emoji,
      },
    });
  }

  async pin() {
    return this.reply({
      pin: this.key,
      type: 1,
    });
  }

  async unpin() {
    return this.reply({
      pin: this.key,
      type: 2,
    });
  }

  async button(button: ButtonReply, type: "template" | "plain" = "template") {
    return this.reply({
      buttonReply: {
        displayText: button.text,
        id: button.id,
        index: button.index,
      },
      type,
    });
  }

  async delete() {
    return this.reply({
      delete: this.key,
    });
  }
}

class WhatsappUpdateMessage {
  constructor(private client: Whatsapp, private message: WAMessageUpdate) {}

  get key() {
    return this.message.key;
  }

  get update() {
    return new WhatsappMessage(this.client, this.message.update);
  }
}

export class WhatsappMessages extends EventEmitter {
  constructor(private client: Whatsapp) {
    super();
  }

  [initialize]() {
    this.client.socket.ev.on("messages.update", (messages) => {
      messages.forEach((message) => {
        this.emit("update", new WhatsappUpdateMessage(this.client, message));
      });
    });

    this.client.socket.ev.on("messages.upsert", (messages) => {
      if (messages.type === "notify") {
        this.emit(
          "messages",
          messages.messages.map(
            (message) => new WhatsappMessage(this.client, message)
          )
        );
        messages.messages.forEach((message) =>
          this.emit("message", new WhatsappMessage(this.client, message))
        );
      }
    });
  }

  on(event: "update", listener: (message: WhatsappUpdateMessage) => void): this;
  on(event: "message", listener: (message: WhatsappMessage) => void): this;
  on(event: "messages", listener: (message: WhatsappMessage[]) => void): this;
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  once(
    event: "update",
    listener: (message: WhatsappUpdateMessage) => void
  ): this;
  once(event: "message", listener: (message: WhatsappMessage) => void): this;
  once(event: "messages", listener: (message: WhatsappMessage[]) => void): this;
  once(event: string, listener: (...args: any[]) => void): this {
    return super.once(event, listener);
  }

  watch(listener: (message: WhatsappMessage[]) => void) {
    this.on("messages", listener);
  }
}
