import { createSignal, For } from "solid-js";
import { $messages } from "../store/messages";
//import { $conversations } from "../store/conversations";
import { useStore } from "@nanostores/solid";

export default function Messages() {
  const messages = useStore($messages);

  return (
    <ul>
      <For each={messages()}>
        {(message) => (
          <li>
            {message.body}
          </li>
        )}
      </For>
    </ul>
  );
}

