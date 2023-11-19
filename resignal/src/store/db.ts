import { persistentAtom } from '@nanostores/persistent'
import type { Message, Conversation } from '@types'

const enc = {
  encode: JSON.stringify,
  decode: JSON.parse,
}

export const $dbLocation = persistentAtom<string | undefined>('db-location', undefined)

export const $dbKey = persistentAtom<string | undefined>('key', undefined)

export const $messages = persistentAtom<Message[]>("messages", [], enc)

export const $conversations = persistentAtom<Conversation[]>("conversations", [], enc)

export default {
  $dbLocation,
  $dbKey,
  $messages,
  $conversations,
}
