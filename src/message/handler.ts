import { Message } from "/message";

export interface MessageHandler {
  onMessage(msg: Message): void;
}
