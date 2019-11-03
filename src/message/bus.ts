import { MessageHandler, Message, MessagePriority, QueuedMessage } from "/message";

export class MessageBus {
  private static subscribers: { [code: string]: MessageHandler[] };

  private static queue: QueuedMessage[] = []; // A message queue for non-high priority messages
  private static queueLimit = 10;

  private constructor() {}

  static subscribe = (code: string, handler: MessageHandler) => {
    if (!MessageBus.subscribers[code]) {
      MessageBus.subscribers[code] = [];
    }

    if (MessageBus.subscribers[code].includes(handler)) {
      console.warn(`Handler: ${code} already exists`);
    } else {
      MessageBus.subscribers[code].push(handler);
    }
  };

  static unsubscribe = (code: string, handler: MessageHandler) => {
    if (!MessageBus.subscribers[code]) {
      console.warn(`Cannot unsubscribe handler: ${code} does not exist`);
      return;
    }

    const index = MessageBus.subscribers[code].indexOf(handler);
    if (index !== -1) {
      MessageBus.subscribers[code].splice(index, 1);
    }
  };

  static post = (msg: Message) => {
    const handlers = MessageBus.subscribers[msg.code];
    if (!handlers) {
      return;
    }

    for (let h of handlers) {
      if (msg.priority == MessagePriority.HIGH) {
        h.onMessage(msg);
      } else {
        MessageBus.queue.push(new QueuedMessage(msg, h));
      }
    }
  };

  static update = (time: number) => {
    const queued = MessageBus.queue.length;

    if (queued) {
      const limit = Math.min(MessageBus.queueLimit, queued);
      for (let i = 0; i < limit; ++i) {
        const qm = MessageBus.queue.pop();
        qm.handler.onMessage(qm.message);
      }
    }
  };
}
