import { map, computed } from 'nanostores'
import type { Message } from './messages'

export type Conversation = {
  messages?: Message[];
  unreadCount: number;
  verified: number;
  messageCount: number;
  sentMessageCount: number;
  id: string;
  e164?: string;
  type: 'private' | 'group';
  version: number;
  sealedSender: number;
  color: string;
  profileKeyCredential?: string;
  profileKeyCredentialExpiration?: number;
  accessKey?: string;
  profileKey?: string;
  needsStorageServiceSync?: boolean;
  capabilities: {
    "gv1-migration": boolean;
    senderKey: boolean;
    announcementGroup: boolean;
    changeNumber: boolean;
    stories: boolean;
    giftBadges: boolean;
    paymentActivation: boolean;
    pni: boolean;
  };
  profileName?: string;
  lastProfile?: {
    profileKey: string;
    profileKeyVersion: string;
  };
  messageCountBeforeMessageRequests?: number;
  storageVersion: number;
  storageID: string;
  avatar?: string | null;
  storageUnknownFields?: string;
  isArchived: boolean;
  markedUnread: boolean;
  username?: string;
  profileAvatar?: {
    hash: string;
    path: string;
  };
  about?: string;
  active_at?: number;
  profileSharing: boolean;
  lastMessage?: string;
  lastMessageStatus?: 'viewed' | 'read' | null;
  timestamp?: number;
  aboutEmoji?: string;
  draft?: string;
  //draftBodyRanges?: any[];  // Requires more specific data for accurate typing.
  draftChanged?: boolean;
  draftTimestamp?: null;
  lastMessageAuthor?: string;
  //draftAttachments?: any[];  // Requires more specific data for accurate typing.
  inbox_position?: number;
  unreadMentionsCount?: number;
  serviceId: string;
  pni?: string;
  //lastMessageBodyRanges?: any[];  // Requires more specific data for accurate typing.
  groupId?: string;
  groupVersion?: number;
  masterKey?: string;
  secretParams?: string;
  publicParams?: string;
  revision?: number;
  name?: string;
  expireTimer?: number;
  accessControl?: {
    attributes: number;
    members: number;
    addFromInviteLink: number;
  };
  left?: boolean;
  announcementsOnly?: boolean;
  systemGivenName?: string;
  systemFamilyName?: string;
  hideStory?: boolean;
  muteExpiresAt: number;
  messageRequestResponseType?: number;
  reportingToken?: string;
  sharedGroupNames?: string[];
  profileFamilyName?: string;
  conversationTitle?: string;
  isPinned?: boolean;
}

export const $conversations = map<Record<string, Conversation>>({})

async function getConversations() {
  try {
    const response = await fetch("/conversations.json");

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();

    const conversations: Record<string, Conversation> = {}

    for (let i = 0; i < data.length; i++) {
      const conversation = data[i];
      conversation.conversationTitle = conversation.name || conversation.username || conversation.profileName || conversation.systemGivenName || "Unknown"
      conversations[conversation.id] = conversation
    }

    return conversations
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return {} as Record<string, Conversation>
  }
}


getConversations().then($conversations.set)
