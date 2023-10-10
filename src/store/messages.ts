import { atom } from "nanostores"
import { $conversations } from "./conversations"
import type { Conversation } from "./conversations"

export type Attachment = {
  contentType: string;
  size: number;
  flags: number;
  width: number;
  height: number;
  blurHash: string;
  uploadTimestamp: number;
  cdnNumber: number;
  cdnKey: string;
  path: string;
  thumbnail: {
    path: string;
    contentType: string;
    width: number;
    height: number;
  };
  url?: string;
}

export type Message = {
  timestamp: number;
  attachments: Attachment[];
  id: string;
  conversationId: string;
  readStatus: number;
  received_at: number;
  received_at_ms: number;
  seenStatus: number;
  sent_at: number;
  serverGuid: string;
  serverTimestamp: number;
  sourceDevice: number;
  type: string;
  unidentifiedDeliveryReceived: boolean;
  schemaVersion: number;
  body: string;
  bodyRanges: [];
  contact: [];
  decrypted_at: number;
  errors: [];
  flags: number;
  hasAttachments: number;
  isViewOnce: boolean;
  preview: [];
  requiredProtocolVersion: number;
  supportedVersionAtReceive: number;
  sourceServiceId: string;
}

export const $messages = atom<Message[]>([])

async function getMessages() {
  try {
    const response = await fetch("/messages.json");

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    await handleMessages(data);
    return data;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

$messages.set(await getMessages());

async function handleMessages(messages: Message[]) {
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const conversation = $conversations.get()[message.conversationId]
    for (let j = 0; j < message?.attachments?.length; j++) {
      const attachment = message.attachments[j];
      const extension = attachment.contentType.split("/")[1]
      attachment.url = `${location.origin}/attachments/${attachment.path.split("/")[1]}.${extension}`
    }
    if (!conversation.messages) conversation.messages = []
    conversation.messages.push(message)
    $conversations.setKey(message.conversationId, conversation)
  }
}
