import { Router } from "express";
import { authenticate, authorize, tryAuthenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  createSupportTicketHandler,
  getAdminSupportChatsHandler,
  getAdminSupportOverviewHandler,
  getAdminSupportTicketsHandler,
  getOrCreateSupportChatHandler,
  getSupportChatsHandler,
  getSupportTicketsHandler,
  markAdminSupportChatReadHandler,
  markSupportChatReadHandler,
  sendAdminSupportChatMessageHandler,
  sendSupportChatMessageHandler,
  streamAdminSupportUpdatesHandler,
  streamSupportUpdatesHandler,
  updateAdminSupportChatHandler,
  updateAdminSupportTicketHandler,
} from "./support.controller.js";
import {
  adminSendAgentMessageSchema,
  adminSupportListSchema,
  adminUpdateChatSchema,
  adminUpdateTicketSchema,
  createSupportChatSchema,
  createSupportTicketSchema,
  getSupportLookupSchema,
  markAdminSupportChatReadSchema,
  markSupportChatReadSchema,
  sendSupportChatMessageSchema,
} from "./support.validation.js";

const router = Router();

router.get("/stream", tryAuthenticate, streamSupportUpdatesHandler);
router.get("/admin/stream", tryAuthenticate, streamAdminSupportUpdatesHandler);

router.get("/tickets", tryAuthenticate, validate(getSupportLookupSchema), getSupportTicketsHandler);
router.post("/tickets", tryAuthenticate, validate(createSupportTicketSchema), createSupportTicketHandler);
router.get("/chats", tryAuthenticate, validate(getSupportLookupSchema), getSupportChatsHandler);
router.post("/chats", tryAuthenticate, validate(createSupportChatSchema), getOrCreateSupportChatHandler);
router.post(
  "/chats/:chatId/messages",
  tryAuthenticate,
  validate(sendSupportChatMessageSchema),
  sendSupportChatMessageHandler,
);
router.post(
  "/chats/:chatId/read",
  tryAuthenticate,
  validate(markSupportChatReadSchema),
  markSupportChatReadHandler,
);

router.get(
  "/admin/overview",
  authenticate,
  authorize("ADMIN"),
  getAdminSupportOverviewHandler,
);
router.get(
  "/admin/tickets",
  authenticate,
  authorize("ADMIN"),
  validate(adminSupportListSchema),
  getAdminSupportTicketsHandler,
);
router.patch(
  "/admin/tickets/:ticketId",
  authenticate,
  authorize("ADMIN"),
  validate(adminUpdateTicketSchema),
  updateAdminSupportTicketHandler,
);
router.get(
  "/admin/chats",
  authenticate,
  authorize("ADMIN"),
  validate(adminSupportListSchema),
  getAdminSupportChatsHandler,
);
router.patch(
  "/admin/chats/:chatId",
  authenticate,
  authorize("ADMIN"),
  validate(adminUpdateChatSchema),
  updateAdminSupportChatHandler,
);
router.post(
  "/admin/chats/:chatId/messages",
  authenticate,
  authorize("ADMIN"),
  validate(adminSendAgentMessageSchema),
  sendAdminSupportChatMessageHandler,
);
router.post(
  "/admin/chats/:chatId/read",
  authenticate,
  authorize("ADMIN"),
  validate(markAdminSupportChatReadSchema),
  markAdminSupportChatReadHandler,
);

export default router;
