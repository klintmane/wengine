import { MessageBus, MessageHandler } from "/message";

export enum MessagePriority {
  NORMAL,
  HIGH
}

export class Message {
  code: string;
  context: any;
  sender: any;
  priority: MessagePriority;

  constructor(code: string, sender: string, context?: any, priority = MessagePriority.NORMAL) {
    this.code = code;
    this.sender = sender;
    this.context = context;
    this.priority = priority;
  }

  static subscribe = (code: string, handler: MessageHandler) => MessageBus.subscribe(code, handler);

  static unsubscribe = (code: string, handler: MessageHandler) => MessageBus.unsubscribe(code, handler);

  static send = (code: string, sender: any, context?: any) => MessageBus.post(new Message(code, sender, context));

  static sendImmediately = (code: string, sender: any, context?: any) => MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
}
