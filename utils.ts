import type { WAProto } from "@whiskeysockets/baileys";
import Logger from "pino";

export const initialize = Symbol("initialize");

export const logger = Logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export function wrapMessage(
  type: "text",
  message: WAProto.Message.IExtendedTextMessage | null | undefined
): WAProto.Message.IExtendedTextMessage | null | undefined;
export function wrapMessage(
  type: "image",
  message: WAProto.Message.IImageMessage | null | undefined
): WAProto.Message.IImageMessage | null | undefined;
export function wrapMessage(
  type: "audio",
  message: WAProto.Message.IAudioMessage | null | undefined
): WAProto.Message.IAudioMessage | null | undefined;
export function wrapMessage(
  type: "video",
  message: WAProto.Message.IVideoMessage | null | undefined
): WAProto.Message.IVideoMessage | null | undefined;
export function wrapMessage(
  type: "document",
  message: WAProto.Message.IDocumentMessage | null | undefined
): WAProto.Message.IDocumentMessage | null | undefined;
export function wrapMessage(
  type: "contacts",
  message: WAProto.Message.IContactsArrayMessage | null | undefined
): WAProto.Message.IContactsArrayMessage | null | undefined;
export function wrapMessage(
  type: "contact",
  message: WAProto.Message.IContactMessage | null | undefined
): WAProto.Message.IContactMessage | null | undefined;
export function wrapMessage(
  type: "location",
  message: WAProto.Message.ILocationMessage | null | undefined
): WAProto.Message.ILocationMessage | null | undefined;
export function wrapMessage(
  type: "protocol",
  message: WAProto.Message.IProtocolMessage | null | undefined
): WAProto.Message.IProtocolMessage | null | undefined;
export function wrapMessage(
  type: "template",
  message: WAProto.Message.ITemplateMessage | null | undefined
): WAProto.Message.ITemplateMessage | null | undefined;
export function wrapMessage(
  type: "sticker",
  message: WAProto.Message.IStickerMessage | null | undefined
): WAProto.Message.IStickerMessage | null | undefined;
export function wrapMessage(
  type: "reaction",
  message: WAProto.Message.IReactionMessage | null | undefined
): WAProto.Message.IReactionMessage | null | undefined;
export function wrapMessage(
  type: "senderKeyDistribution",
  message: WAProto.Message.ISenderKeyDistributionMessage | null | undefined
): WAProto.Message.ISenderKeyDistributionMessage | null | undefined;
export function wrapMessage(
  type: "highlyStructured",
  message: WAProto.Message.IHighlyStructuredMessage | null | undefined
): WAProto.Message.IHighlyStructuredMessage | null | undefined;
export function wrapMessage(
  type: "fastRatchetKeySenderKeyDistributionMessage",
  message: WAProto.Message.ISenderKeyDistributionMessage | null | undefined
): WAProto.Message.ISenderKeyDistributionMessage | null | undefined;
export function wrapMessage(
  type: "sendPayment",
  message: WAProto.Message.ISendPaymentMessage | null | undefined
): WAProto.Message.ISendPaymentMessage | null | undefined;
export function wrapMessage(
  type: "liveLocation",
  message: WAProto.Message.ILiveLocationMessage | null | undefined
): WAProto.Message.ILiveLocationMessage | null | undefined;
export function wrapMessage(
  type: "requestPayment",
  message: WAProto.Message.IRequestPaymentMessage | null | undefined
): WAProto.Message.IRequestPaymentMessage | null | undefined;
export function wrapMessage(
  type: "declinePaymentRequest",
  message: WAProto.Message.IDeclinePaymentRequestMessage | null | undefined
): WAProto.Message.IDeclinePaymentRequestMessage | null | undefined;
export function wrapMessage(
  type: "cancelPaymentRequest",
  message: WAProto.Message.ICancelPaymentRequestMessage | null | undefined
): WAProto.Message.ICancelPaymentRequestMessage | null | undefined;
export function wrapMessage(
  type: "groupInvite",
  message: WAProto.Message.IGroupInviteMessage | null | undefined
): WAProto.Message.IGroupInviteMessage | null | undefined;
export function wrapMessage(
  type: "templateButtonReply",
  message: WAProto.Message.ITemplateButtonReplyMessage | null | undefined
): WAProto.Message.ITemplateButtonReplyMessage | null | undefined;
export function wrapMessage(
  type: "product",
  message: WAProto.Message.IProductMessage | null | undefined
): WAProto.Message.IProductMessage | null | undefined;
export function wrapMessage(
  type: "list",
  message: WAProto.Message.IListMessage | null | undefined
): WAProto.Message.IListMessage | null | undefined;
export function wrapMessage(
  type: "order",
  message: WAProto.Message.IOrderMessage | null | undefined
): WAProto.Message.IOrderMessage | null | undefined;
export function wrapMessage(
  type: "deviceSent",
  message: WAProto.Message.IDeviceSentMessage | null | undefined
): WAProto.Message.IDeviceSentMessage | null | undefined;
export function wrapMessage(
  type: "listResponse",
  message: WAProto.Message.IListResponseMessage | null | undefined
): WAProto.Message.IListResponseMessage | null | undefined;
export function wrapMessage(
  type: "ephemeral",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "invoice",
  message: WAProto.Message.IInvoiceMessage | null | undefined
): WAProto.Message.IInvoiceMessage | null | undefined;
export function wrapMessage(
  type: "buttons",
  message: WAProto.Message.IButtonsMessage | null | undefined
): WAProto.Message.IButtonsMessage | null | undefined;
export function wrapMessage(
  type: "buttonsResponse",
  message: WAProto.Message.IButtonsResponseMessage | null | undefined
): WAProto.Message.IButtonsResponseMessage | null | undefined;
export function wrapMessage(
  type: "paymentInvite",
  message: WAProto.Message.IPaymentInviteMessage | null | undefined
): WAProto.Message.IPaymentInviteMessage | null | undefined;
export function wrapMessage(
  type: "interactive",
  message: WAProto.Message.IInteractiveMessage | null | undefined
): WAProto.Message.IInteractiveMessage | null | undefined;
export function wrapMessage(
  type: "stickerSyncRmr",
  message: WAProto.Message.IStickerSyncRMRMessage | null | undefined
): WAProto.Message.IStickerSyncRMRMessage | null | undefined;
export function wrapMessage(
  type: "interactiveResponse",
  message: WAProto.Message.IInteractiveResponseMessage | null | undefined
): WAProto.Message.IInteractiveResponseMessage | null | undefined;
export function wrapMessage(
  type: "pollCreation",
  message: WAProto.Message.IPollCreationMessage | null | undefined
): WAProto.Message.IPollCreationMessage | null | undefined;
export function wrapMessage(
  type: "pollUpdate",
  message: WAProto.Message.IPollUpdateMessage | null | undefined
): WAProto.Message.IPollUpdateMessage | null | undefined;
export function wrapMessage(
  type: "keepInChat",
  message: WAProto.Message.IKeepInChatMessage | null | undefined
): WAProto.Message.IKeepInChatMessage | null | undefined;
export function wrapMessage(
  type: "documentWithCaption",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "requestPhoneNumber",
  message: WAProto.Message.IRequestPhoneNumberMessage | null | undefined
): WAProto.Message.IRequestPhoneNumberMessage | null | undefined;
export function wrapMessage(
  type: "encReaction",
  message: WAProto.Message.IEncReactionMessage | null | undefined
): WAProto.Message.IEncReactionMessage | null | undefined;
export function wrapMessage(
  type: "edited",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "viewOnceV2Extension",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "pollCreationV2",
  message: WAProto.Message.IPollCreationMessage | null | undefined
): WAProto.Message.IPollCreationMessage | null | undefined;
export function wrapMessage(
  type: "scheduledCallCreation",
  message: WAProto.Message.IScheduledCallCreationMessage | null | undefined
): WAProto.Message.IScheduledCallCreationMessage | null | undefined;
export function wrapMessage(
  type: "groupMentioned",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "pinInChat",
  message: WAProto.Message.IPinInChatMessage | null | undefined
): WAProto.Message.IPinInChatMessage | null | undefined;
export function wrapMessage(
  type: "pollCreationV3",
  message: WAProto.Message.IPollCreationMessage | null | undefined
): WAProto.Message.IPollCreationMessage | null | undefined;
export function wrapMessage(
  type: "scheduledCallEdit",
  message: WAProto.Message.IScheduledCallEditMessage | null | undefined
): WAProto.Message.IScheduledCallEditMessage | null | undefined;
export function wrapMessage(
  type: "ptv",
  message: WAProto.Message.IVideoMessage | null | undefined
): WAProto.Message.IVideoMessage | null | undefined;
export function wrapMessage(
  type: "botInvoke",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "callLog",
  message: WAProto.Message.ICallLogMessage | null | undefined
): WAProto.Message.ICallLogMessage | null | undefined;
export function wrapMessage(
  type: "encComment",
  message: WAProto.Message.IEncCommentMessage | null | undefined
): WAProto.Message.IEncCommentMessage | null | undefined;
export function wrapMessage(
  type: "lottieSticker",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "event",
  message: WAProto.Message.IEventMessage | null | undefined
): WAProto.Message.IEventMessage | null | undefined;
export function wrapMessage(
  type: "comment",
  message: WAProto.Message.ICommentMessage | null | undefined
): WAProto.Message.ICommentMessage | null | undefined;
export function wrapMessage(
  type: "newsletterAdminInvite",
  message: WAProto.Message.INewsletterAdminInviteMessage | null | undefined
): WAProto.Message.INewsletterAdminInviteMessage | null | undefined;
export function wrapMessage(
  type: "placeholder",
  message: WAProto.Message.IPlaceholderMessage | null | undefined
): WAProto.Message.IPlaceholderMessage | null | undefined;
export function wrapMessage(
  type: "encEventUpdate",
  message: WAProto.Message.IEncEventUpdateMessage | null | undefined
): WAProto.Message.IEncEventUpdateMessage | null | undefined;
export function wrapMessage(
  type: "viewOnce",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(
  type: "viewOnceV2",
  message: WAProto.Message.IFutureProofMessage | null | undefined
): WAProto.Message.IFutureProofMessage | null | undefined;
export function wrapMessage(type: string, message: any) {
  return message;
}

export function getMessageType(message?: WAProto.IWebMessageInfo["message"]) {
  if (message?.extendedTextMessage || message?.conversation) return "text";
  if (message?.imageMessage) return "image";
  if (message?.audioMessage) return "audio";
  if (message?.videoMessage) return "video";
  if (message?.documentMessage) return "document";
  if (message?.contactsArrayMessage) return "contacts";
  if (message?.contactMessage) return "contact";
  if (message?.locationMessage) return "location";
  if (message?.protocolMessage) return "protocol";
  if (message?.templateMessage) return "template";
  if (message?.stickerMessage) return "sticker";
  if (message?.reactionMessage) return "reaction";
  if (message?.senderKeyDistributionMessage) return "senderKeyDistribution";
  if (message?.highlyStructuredMessage) return "highlyStructured";
  if (message?.fastRatchetKeySenderKeyDistributionMessage)
    return "fastRatchetKeySenderKeyDistribution";
  if (message?.sendPaymentMessage) return "sendPayment";
  if (message?.liveLocationMessage) return "liveLocation";
  if (message?.requestPaymentMessage) return "requestPayment";
  if (message?.declinePaymentRequestMessage) return "declinePaymentRequest";
  if (message?.cancelPaymentRequestMessage) return "cancelPaymentRequest";
  if (message?.groupInviteMessage) return "groupInvite";
  if (message?.templateButtonReplyMessage) return "templateButtonReply";
  if (message?.productMessage) return "product";
  if (message?.listMessage) return "list";
  if (message?.orderMessage) return "order";
  if (message?.deviceSentMessage) return "deviceSent";
  if (message?.listResponseMessage) return "listResponse";
  if (message?.ephemeralMessage) return "ephemeral";
  if (message?.invoiceMessage) return "invoice";
  if (message?.buttonsMessage) return "buttons";
  if (message?.buttonsResponseMessage) return "buttonsResponse";
  if (message?.paymentInviteMessage) return "paymentInvite";
  if (message?.interactiveMessage) return "interactive";
  if (message?.stickerSyncRmrMessage) return "stickerSyncRmr";
  if (message?.interactiveResponseMessage) return "interactiveResponse";
  if (message?.pollCreationMessage) return "pollCreation";
  if (message?.pollUpdateMessage) return "pollUpdate";
  if (message?.keepInChatMessage) return "keepInChat";
  if (message?.documentWithCaptionMessage) return "documentWithCaption";
  if (message?.requestPhoneNumberMessage) return "requestPhoneNumber";
  if (message?.encReactionMessage) return "encReaction";
  if (message?.editedMessage) return "edited";
  if (message?.viewOnceMessageV2Extension) return "viewOnceV2Extension";
  if (message?.pollCreationMessageV2) return "pollCreationV2";
  if (message?.scheduledCallCreationMessage) return "scheduledCallCreation";
  if (message?.groupMentionedMessage) return "groupMentioned";
  if (message?.pinInChatMessage) return "pinInChat";
  if (message?.pollCreationMessageV3) return "pollCreationV3";
  if (message?.scheduledCallEditMessage) return "scheduledCallEdit";
  if (message?.ptvMessage) return "ptv";
  if (message?.botInvokeMessage) return "botInvoke";
  if (message?.callLogMesssage) return "callLog";
  if (message?.encCommentMessage) return "encComment";
  if (message?.lottieStickerMessage) return "lottieSticker";
  if (message?.eventMessage) return "event";
  if (message?.commentMessage) return "comment";
  if (message?.newsletterAdminInviteMessage) return "newsletterAdminInvite";
  if (message?.placeholderMessage) return "placeholder";
  if (message?.encEventUpdateMessage) return "encEventUpdate";
  if (message?.viewOnceMessage || message?.viewOnceMessageV2) return "viewOnce";

  return null;
}
