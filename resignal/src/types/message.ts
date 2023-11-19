import type { Attachment } from './Attachment';

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
  sendStateByConversationId: {
    [key: string]: {
      status: string;
    }
  }
}
