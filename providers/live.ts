/* eslint-disable @typescript-eslint/no-explicit-any */
import { LiveProvider } from "@refinedev/core";
import { pusherClient } from "@/lib/pusher";

export const liveProvider: LiveProvider = {
  subscribe: ({ channel, types, callback }) => {
    const pusherChannel = pusherClient.subscribe(channel);

    pusherChannel.bind_global((event: string, data: any) => {
      if (types.includes("*") || types.includes(event as any)) {
        callback({
          channel,
          type: event as any,
          payload: data,
          date: new Date(),
        });
      }
    });

    return pusherChannel;
  },
  unsubscribe: (pusherChannel) => {
    pusherClient.unsubscribe(pusherChannel.name);
  },
};
