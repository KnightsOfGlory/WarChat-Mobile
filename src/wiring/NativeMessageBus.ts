import {MessageBus, MessageSubscription} from "@knightsofglory/warlibrary/lib/MessageBus";

export type Channel = string

export class NativeMessageBus implements MessageBus {

  private subscribers: { [key: string]: MessageSubscription[] } = {}

  private ensureChannelExists(channel: Channel) {
    channel = channel.toLowerCase()

    if (!(channel in this.subscribers)) {
      this.subscribers[channel] = []
    }
  }

  on(channel: string, callback: MessageSubscription): void {
    channel = channel.toLowerCase()
    this.ensureChannelExists(channel)

    this.subscribers[channel].push(callback)
  }

  send(channel: string, ...args: unknown[]): void {
    channel = channel.toLowerCase()
    this.ensureChannelExists(channel)

    this.subscribers[channel].forEach(callback => callback(...args))
  }
}