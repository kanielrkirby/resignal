import { createSignal, For } from "solid-js";

// Examples:
// {"timestamp":1676696358541,"attachments":[],"id":"07506bcc-2ea9-4b1d-826c-8a2ca7807b2c","conversationId":"468766d6-3773-44e2-925f-5e147f2ce1ef","readStatus":0,"received_at":39,"received_at_ms":1676696359309,"seenStatus":2,"sent_at":1676696358541,"serverGuid":"2fedda12-4a56-4a96-8442-804ed19a2acf","serverTimestamp":1676696359242,"source":"+13256035958","sourceDevice":1,"type":"incoming","unidentifiedDeliveryReceived":true,"schemaVersion":10,"body":"Dog","bodyRanges":[],"contact":[],"decrypted_at":1676696359396,"errors":[],"flags":0,"hasAttachments":0,"isViewOnce":false,"preview":[],"requiredProtocolVersion":0,"supportedVersionAtReceive":7,"sourceServiceId":"98930540-a1af-4c9d-ad5c-f1ba14ea87a0"},
// {"timestamp":1676696365389,"attachments":[],"id":"f9f56632-0812-42f7-9a64-0ee192319b72","conversationId":"468766d6-3773-44e2-925f-5e147f2ce1ef","readStatus":0,"received_at":43,"received_at_ms":1676696366095,"seenStatus":2,"sent_at":1676696365389,"serverGuid":"b7fed3ed-d9e7-4a87-9df1-a71d05568299","serverTimestamp":1676696366085,"source":"+13256035958","sourceDevice":1,"type":"incoming","unidentifiedDeliveryReceived":true,"schemaVersion":10,"body":"🐕","bodyRanges":[],"contact":[],"decrypted_at":1676696366187,"errors":[],"flags":0,"hasAttachments":0,"isViewOnce":false,"preview":[],"requiredProtocolVersion":0,"supportedVersionAtReceive":7,"sourceServiceId":"98930540-a1af-4c9d-ad5c-f1ba14ea87a0"},
// {"timestamp":1676696383302,"attachments":[],"id":"82f8a2c6-2824-4122-b257-9cf57143c37e","type":"outgoing","body":"You have a dog?? I was only gone 2 minutes","conversationId":"468766d6-3773-44e2-925f-5e147f2ce1ef","contact":[],"preview":[],"sent_at":1676696383302,"received_at":45,"received_at_ms":1676696383302,"expirationStartTimestamp":1676696383416,"readStatus":0,"seenStatus":0,"bodyRanges":[],"sendHQImages":false,"sendStateByConversationId":{"468766d6-3773-44e2-925f-5e147f2ce1ef":{"status":"Read","updatedAt":1676696383164},"521a4943-e15d-4988-8743-25ff8d7f715a":{"status":"Sent","updatedAt":1676696383490}},"schemaVersion":10,"hasAttachments":0,"unidentifiedDeliveries":["98930540-a1af-4c9d-ad5c-f1ba14ea87a0"],"errors":[],"synced":true},
// {"timestamp":1676696404648,"attachments":[],"id":"6a3de4cc-7b65-49e9-be9a-d2a13ee08577","conversationId":"468766d6-3773-44e2-925f-5e147f2ce1ef","readStatus":0,"received_at":53,"received_at_ms":1676696405343,"seenStatus":2,"sent_at":1676696404648,"serverGuid":"8924a822-49e9-4f60-9b5e-49f99dca544c","serverTimestamp":1676696405338,"source":"+13256035958","sourceDevice":1,"type":"incoming","unidentifiedDeliveryReceived":true,"schemaVersion":10,"body":"😂 ya I'm quick","bodyRanges":[],"contact":[],"decrypted_at":1676696405432,"errors":[],"flags":0,"hasAttachments":0,"isViewOnce":false,"preview":[],"requiredProtocolVersion":0,"supportedVersionAtReceive":7,"sourceServiceId":"98930540-a1af-4c9d-ad5c-f1ba14ea87a0"},
// {"timestamp":1676696471349,"attachments":[],"id":"50d79a4a-0a3c-4205-a33a-7652899e1022","conversationId":"2170ad90-0c14-4726-9462-8e103a2f41a9","readStatus":0,"received_at":58,"received_at_ms":1676696471952,"seenStatus":2,"sent_at":1676696471349,"serverGuid":"f402b1af-f82c-453b-b9e5-91676634951d","serverTimestamp":1676696471949,"sourceDevice":1,"type":"incoming","unidentifiedDeliveryReceived":false,"schemaVersion":10,"body":"Hey baby ówò","bodyRanges":[],"contact":[],"decrypted_at":1676696472039,"errors":[],"flags":0,"hasAttachments":0,"isViewOnce":false,"preview":[],"requiredProtocolVersion":0,"supportedVersionAtReceive":7,"sourceServiceId":"26beb437-e2a7-41ed-8714-36cd9d380706"},
//
// // The sender is: 98930540-a1af-4c9d-ad5c-f1ba14ea87a0
// // to get the name, you need to find the contact with the id of 98930540-a1af-4c9d-ad5c-f1ba14ea87a0


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

export default function Messages() {
  const [messages, setMessages] = createSignal<Message[]>([]);

  async function fetchMessages() {
    const response = await fetch("/messages.json");
    const data = await response.json();
    setMessages(data);
    console.log(data);
  }

  fetchMessages();

  return (
    <ul>
      <For each={messages()}>
        {(message) => (
          <li>
            <h1>{message.
            {message.body}
          </li>
        )}
      </For>
    </ul>
  );
}

