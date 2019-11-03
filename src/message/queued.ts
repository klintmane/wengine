import { Message, MessageHandler } from "/message";

export class QueuedMessage {
  message: Message;
  handler: MessageHandler;

  constructor(message: Message, handler: MessageHandler) {
    this.message = message;
    this.handler = handler;
  }
}
