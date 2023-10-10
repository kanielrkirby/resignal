import { For } from "solid-js";
import { $messages } from "../store/messages";
import { $conversations } from "../store/conversations";
import { useStore } from "@nanostores/solid";

export default function Messages() {
  const messages = useStore($messages);
  const conversations = useStore($conversations)

  return (
    <ul>
      <For each={messages()}>
        {(message) => (
          <li class={`${""}`}>
            {message.body}
          </li>
        )}
      </For>
    </ul>
  );
}

