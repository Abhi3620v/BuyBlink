import { EventEmitter } from "node:events";

const supportEvents = new EventEmitter();
const SUPPORT_UPDATE_EVENT = "support:update";

supportEvents.setMaxListeners(0);

export const publishSupportEvent = (payload) => {
  supportEvents.emit(SUPPORT_UPDATE_EVENT, {
    ...payload,
    emittedAt: new Date().toISOString(),
  });
};

export const subscribeSupportEvents = (handler) => {
  supportEvents.on(SUPPORT_UPDATE_EVENT, handler);

  return () => {
    supportEvents.off(SUPPORT_UPDATE_EVENT, handler);
  };
};
