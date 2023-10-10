import { atom } from "nanostores"

type Message = {
  timestamp: number;
  attachments: [];
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
    return data;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

$messages.set(await getMessages());

