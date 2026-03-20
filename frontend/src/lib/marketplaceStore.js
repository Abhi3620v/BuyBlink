import dummyProducts from "../data/dummyProducts";

const SELLER_PRODUCTS_KEY = "buyblink-seller-products";
const ORDERS_KEY = "buyblink-orders";
const ORDER_EMAILS_KEY = "buyblink-order-emails";
const PRODUCT_REVIEWS_KEY = "buyblink-product-reviews";
const SUPPORT_TICKETS_KEY = "buyblink-support-tickets";
const SUPPORT_CHATS_KEY = "buyblink-support-chats";

const DEFAULT_CATEGORY = "Eco Essentials";
const DEFAULT_SUSTAINABILITY_SCORE = 80;

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const normalizeCatalogType = (value) =>
  ["retail", "wholesale", "all"].includes(value) ? value : "all";

export const normalizeSustainabilityScore = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return DEFAULT_SUSTAINABILITY_SCORE;
  }

  return Math.min(100, Math.max(1, Math.round(numericValue)));
};

export const getBaseMarketplaceProducts = () =>
  dummyProducts.map((product) => ({
    ...product,
    sellerId: "buyblink-platform",
    sellerName: "BuyBlink Curated",
    catalogType: "all",
    category: product.category || DEFAULT_CATEGORY,
    sustainabilityScore: normalizeSustainabilityScore(
      product.sustainabilityScore,
    ),
    createdAt: product.createdAt || "2026-03-20T00:00:00.000Z",
  }));

export const getStoredSellerProducts = () =>
  readJson(SELLER_PRODUCTS_KEY, []).map((product) => ({
    ...product,
    catalogType: normalizeCatalogType(product.catalogType),
    category: product.category || DEFAULT_CATEGORY,
    sustainabilityScore: normalizeSustainabilityScore(
      product.sustainabilityScore,
    ),
  }));

export const saveStoredSellerProducts = (products) => {
  writeJson(SELLER_PRODUCTS_KEY, products);
};

export const getMarketplaceProducts = () => [
  ...getBaseMarketplaceProducts(),
  ...getStoredSellerProducts(),
];

export const getMarketplaceProductsForSection = (section) =>
  getMarketplaceProducts().filter((product) => {
    const catalogType = normalizeCatalogType(product.catalogType);
    return catalogType === "all" || catalogType === section;
  });

export const getSellerProductsForStore = (sellerId) =>
  getStoredSellerProducts().filter((product) => product.sellerId === sellerId);

export const upsertSellerProduct = (nextProduct) => {
  const existingProducts = getStoredSellerProducts();
  const productToSave = {
    ...nextProduct,
    catalogType: normalizeCatalogType(nextProduct.catalogType),
    category: nextProduct.category || DEFAULT_CATEGORY,
    sustainabilityScore: normalizeSustainabilityScore(
      nextProduct.sustainabilityScore,
    ),
  };

  const updatedProducts = existingProducts.some(
    (product) => product.id === productToSave.id,
  )
    ? existingProducts.map((product) =>
        product.id === productToSave.id ? productToSave : product,
      )
    : [...existingProducts, productToSave];

  saveStoredSellerProducts(updatedProducts);
  return updatedProducts;
};

export const deleteSellerProduct = (productId) => {
  const updatedProducts = getStoredSellerProducts().filter(
    (product) => product.id !== productId,
  );

  saveStoredSellerProducts(updatedProducts);
  return updatedProducts;
};

export const getOrders = () => readJson(ORDERS_KEY, []);

export const saveOrders = (orders) => {
  writeJson(ORDERS_KEY, orders);
};

export const getSupportTickets = () =>
  readJson(SUPPORT_TICKETS_KEY, []).sort(
    (firstTicket, secondTicket) =>
      new Date(secondTicket.createdAt) - new Date(firstTicket.createdAt),
  );

export const getSupportTicketsForEmail = (email) => {
  if (!email) {
    return [];
  }

  return getSupportTickets().filter(
    (ticket) => ticket.customerEmail?.toLowerCase() === email.toLowerCase(),
  );
};

export const createSupportTicket = (ticketInput) => {
  const existingTickets = getSupportTickets();
  const timestamp = new Date().toISOString();
  const ticketNumber = `BB-CS-${Date.now()}`;

  const ticketToSave = {
    id: ticketInput.id || ticketNumber,
    ticketNumber,
    customerName: ticketInput.customerName?.trim() || "BuyBlink Customer",
    customerEmail: ticketInput.customerEmail?.trim() || "",
    customerPhone: ticketInput.customerPhone?.trim() || "",
    orderId: ticketInput.orderId?.trim() || "",
    category: ticketInput.category?.trim() || "General Support",
    priority: ticketInput.priority?.trim() || "Medium",
    subject: ticketInput.subject?.trim() || "Customer Support Request",
    description: ticketInput.description?.trim() || "",
    status: ticketInput.status?.trim() || "Open",
    createdAt: ticketInput.createdAt || timestamp,
    updatedAt: timestamp,
    responseEta: "Within 24 hours",
  };

  writeJson(SUPPORT_TICKETS_KEY, [ticketToSave, ...existingTickets]);
  return ticketToSave;
};

export const getSupportChats = () =>
  readJson(SUPPORT_CHATS_KEY, []).sort(
    (firstChat, secondChat) =>
      new Date(secondChat.updatedAt || secondChat.createdAt) -
      new Date(firstChat.updatedAt || firstChat.createdAt),
  );

export const getSupportChatsForEmail = (email) => {
  if (!email) {
    return [];
  }

  return getSupportChats().filter(
    (chat) => chat.customerEmail?.toLowerCase() === email.toLowerCase(),
  );
};

export const getSupportChatById = (chatId) =>
  getSupportChats().find((chat) => chat.id === chatId) || null;

const saveSupportChats = (chats) => {
  writeJson(SUPPORT_CHATS_KEY, chats);
};

const buildSupportChatWelcome = (chat) => {
  const orderContext = chat.orderId ? ` for order ${chat.orderId}` : "";

  return {
    id: `MSG-${chat.id}-welcome`,
    senderType: "agent",
    senderName: chat.assignedAgent,
    text: `Hi ${chat.customerName || "there"}, I'm ${chat.assignedAgent}. I've opened your support chat${orderContext}. Share the issue in detail and I'll guide the next steps.`,
    createdAt: chat.createdAt,
  };
};

const buildSupportAgentReply = (messageText, chat) => {
  const normalizedMessage = messageText.toLowerCase();

  if (
    normalizedMessage.includes("refund") ||
    normalizedMessage.includes("return")
  ) {
    return `I’ve marked this under refund and return support${chat.orderId ? ` for ${chat.orderId}` : ""}. Please share whether the item was damaged, incorrect, or no longer needed so we can guide the next action.`;
  }

  if (
    normalizedMessage.includes("late") ||
    normalizedMessage.includes("delay") ||
    normalizedMessage.includes("delivery") ||
    normalizedMessage.includes("where is")
  ) {
    return `I’m checking the delivery concern${chat.orderId ? ` for ${chat.orderId}` : ""}. Please confirm the latest status you saw so support can investigate the shipping timeline faster.`;
  }

  if (
    normalizedMessage.includes("payment") ||
    normalizedMessage.includes("charged") ||
    normalizedMessage.includes("upi") ||
    normalizedMessage.includes("card")
  ) {
    return "I’ve tagged this as a payment issue. Please avoid retrying multiple payments until support verifies the payment state and transaction details.";
  }

  if (
    normalizedMessage.includes("broken") ||
    normalizedMessage.includes("damaged") ||
    normalizedMessage.includes("quality") ||
    normalizedMessage.includes("defect")
  ) {
    return "Thanks for reporting the product condition. Please mention the exact quality issue and whether the packaging was damaged so the support team can assess it correctly.";
  }

  return `Thanks, I’ve logged that update${chat.orderId ? ` for ${chat.orderId}` : ""}. A customer support agent will continue from here, and you can keep replying in this thread with any extra details.`;
};

export const getOrCreateSupportChat = (chatInput) => {
  const existingChats = getSupportChats();
  const customerEmail = chatInput.customerEmail?.trim() || "";
  const ticketId = chatInput.ticketId?.trim() || "";
  const orderId = chatInput.orderId?.trim() || "";
  const subject = chatInput.subject?.trim() || "General Support Chat";

  const existingChat = existingChats.find((chat) => {
    if (!customerEmail || chat.customerEmail?.toLowerCase() !== customerEmail.toLowerCase()) {
      return false;
    }

    if (ticketId && chat.ticketId === ticketId) {
      return true;
    }

    return !ticketId && chat.orderId === orderId && chat.subject === subject;
  });

  if (existingChat) {
    return existingChat;
  }

  const timestamp = new Date().toISOString();
  const chatToSave = {
    id: `CHAT-${Date.now()}`,
    chatNumber: `BB-CHAT-${Date.now()}`,
    customerName: chatInput.customerName?.trim() || "BuyBlink Customer",
    customerEmail,
    orderId,
    ticketId,
    category: chatInput.category?.trim() || "General Support",
    subject,
    status: "Active",
    assignedAgent: "Aisha from BuyBlink Care",
    createdAt: timestamp,
    updatedAt: timestamp,
    messages: [],
  };

  chatToSave.messages = [buildSupportChatWelcome(chatToSave)];
  saveSupportChats([chatToSave, ...existingChats]);
  return chatToSave;
};

export const sendSupportChatMessage = (chatId, messageInput) => {
  const timestamp = new Date().toISOString();
  const customerMessage = {
    id: `MSG-${Date.now()}-customer`,
    senderType: "customer",
    senderName: messageInput.senderName?.trim() || "Customer",
    text: messageInput.text?.trim() || "",
    createdAt: timestamp,
  };

  const updatedChats = getSupportChats().map((chat) => {
    if (chat.id !== chatId || !customerMessage.text) {
      return chat;
    }

    const agentMessage = {
      id: `MSG-${Date.now()}-agent`,
      senderType: "agent",
      senderName: chat.assignedAgent,
      text: buildSupportAgentReply(customerMessage.text, chat),
      createdAt: new Date(Date.now() + 1000).toISOString(),
    };

    return {
      ...chat,
      status: "In Review",
      updatedAt: agentMessage.createdAt,
      messages: [...(chat.messages || []), customerMessage, agentMessage],
    };
  });

  saveSupportChats(updatedChats);
  return getSupportChatById(chatId);
};

export const getAllProductReviews = () => readJson(PRODUCT_REVIEWS_KEY, []);

export const getProductReviews = (productId) =>
  getAllProductReviews()
    .filter((review) => review.productId === productId)
    .sort(
      (firstReview, secondReview) =>
        new Date(secondReview.createdAt) - new Date(firstReview.createdAt),
    );

export const getProductReviewSummary = (
  productId,
  fallbackRating = 4.8,
  fallbackCount = 124,
) => {
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return {
      rating: fallbackRating,
      reviewCount: fallbackCount,
      reviews,
    };
  }

  const totalRating = reviews.reduce(
    (sum, review) => sum + (Number(review.rating) || 0),
    0,
  );

  return {
    rating: totalRating / reviews.length,
    reviewCount: reviews.length,
    reviews,
  };
};

export const addProductReview = (reviewInput) => {
  const reviewToSave = {
    id: reviewInput.id || `REVIEW-${Date.now()}`,
    ...reviewInput,
    rating: Math.min(5, Math.max(1, Number(reviewInput.rating) || 5)),
    createdAt: reviewInput.createdAt || new Date().toISOString(),
  };

  const existingReviews = getAllProductReviews().filter(
    (review) =>
      !(
        review.orderId === reviewToSave.orderId &&
        review.productId === reviewToSave.productId &&
        review.customerEmail === reviewToSave.customerEmail
      ),
  );

  writeJson(PRODUCT_REVIEWS_KEY, [reviewToSave, ...existingReviews]);
  return reviewToSave;
};

export const getOrderById = (orderId) =>
  getOrders().find((order) => order.id === orderId) || null;

export const getOrderConfirmationEmails = () =>
  readJson(ORDER_EMAILS_KEY, []);

export const getOrderConfirmationEmailForOrder = (orderId) =>
  getOrderConfirmationEmails().find((email) => email.orderId === orderId) || null;

const buildOrderEmailBody = (order) => {
  const orderLines = (order.items || [])
    .map((item) => {
      const unitPrice =
        item.mode === "wholesale"
          ? Number(item.wholesalePrice) || 0
          : Number(item.retailPrice) || 0;

      return `- ${item.name} (${item.mode}) x${item.quantity} - Rs.${unitPrice * item.quantity}`;
    })
    .join("\n");

  return [
    `Hi ${order.customer?.name || order.shipping?.name || "Customer"},`,
    "",
    "Thank you for shopping with BuyBlink.",
    `Your order ${order.id} has been placed successfully on ${new Date(order.date).toLocaleDateString("en-IN")}.`,
    "",
    "Order Summary:",
    orderLines,
    "",
    `Payment Method: ${order.paymentMethod}`,
    `Order Total: Rs.${Number(order.amount || 0).toLocaleString("en-IN")}`,
    "",
    "Shipping Address:",
    `${order.shipping?.address || ""}, ${order.shipping?.city || ""}, ${order.shipping?.pincode || ""}`,
    "",
    "We will keep you updated as your order moves forward.",
    "",
    "Team BuyBlink",
  ].join("\n");
};

export const queueOrderConfirmationEmail = (order) => {
  const emailAddress = order.customer?.email || order.shipping?.email;

  if (!emailAddress) {
    return null;
  }

  const emailRecord = {
    id: `EMAIL-${order.id}`,
    orderId: order.id,
    to: emailAddress,
    subject: `BuyBlink Order Confirmation - ${order.id}`,
    body: buildOrderEmailBody(order),
    status: "Prepared",
    createdAt: new Date().toISOString(),
  };

  const existingEmails = getOrderConfirmationEmails().filter(
    (email) => email.orderId !== order.id,
  );

  writeJson(ORDER_EMAILS_KEY, [emailRecord, ...existingEmails]);
  return emailRecord;
};

const getItemLineTotal = (item) =>
  item.quantity *
  (item.mode === "wholesale"
    ? Number(item.wholesalePrice) || 0
    : Number(item.retailPrice) || 0);

export const getSellerOrders = (sellerId) =>
  getOrders()
    .map((order) => {
      const sellerItems = (order.items || []).filter(
        (item) => item.sellerId === sellerId,
      );

      if (sellerItems.length === 0) {
        return null;
      }

      return {
        ...order,
        sellerItems,
        sellerAmount: sellerItems.reduce(
          (sum, item) => sum + getItemLineTotal(item),
          0,
        ),
      };
    })
    .filter(Boolean);

export const updateSellerOrderItemStatus = (orderId, sellerId, nextStatus) => {
  const updatedOrders = getOrders().map((order) => {
    if (order.id !== orderId) {
      return order;
    }

    return {
      ...order,
      items: (order.items || []).map((item) =>
        item.sellerId === sellerId ? { ...item, sellerStatus: nextStatus } : item,
      ),
    };
  });

  saveOrders(updatedOrders);
  return updatedOrders;
};

export const getSellerCustomers = (sellerId) => {
  const customerMap = new Map();

  getSellerOrders(sellerId).forEach((order) => {
    const customerEmail =
      order.customer?.email || order.shipping?.email || `guest-${order.id}`;

    const existingCustomer = customerMap.get(customerEmail) || {
      id: customerEmail,
      name: order.customer?.name || order.shipping?.name || "Guest Customer",
      email: order.customer?.email || order.shipping?.email || "Guest checkout",
      phone: order.customer?.phone || order.shipping?.phone || "Not provided",
      city: order.shipping?.city || "Unknown",
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: order.date,
    };

    existingCustomer.totalOrders += 1;
    existingCustomer.totalSpent += order.sellerAmount;
    existingCustomer.lastOrderDate =
      new Date(order.date) > new Date(existingCustomer.lastOrderDate)
        ? order.date
        : existingCustomer.lastOrderDate;

    customerMap.set(customerEmail, existingCustomer);
  });

  return Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.lastOrderDate) - new Date(a.lastOrderDate),
  );
};

export const getSellerDashboardStats = (sellerId, mode) => {
  const products = getSellerProductsForStore(sellerId).filter((product) => {
    const catalogType = normalizeCatalogType(product.catalogType);
    return catalogType === "all" || catalogType === mode;
  });

  const orders = getSellerOrders(sellerId).filter((order) =>
    order.sellerItems.some((item) => item.mode === mode),
  );

  const revenue = orders.reduce((sum, order) => {
    const modeAmount = order.sellerItems
      .filter((item) => item.mode === mode)
      .reduce((itemSum, item) => itemSum + getItemLineTotal(item), 0);

    return sum + modeAmount;
  }, 0);

  const customers = new Set(
    orders.map((order) => order.customer?.email || order.shipping?.email || order.id),
  );

  return {
    productsCount: products.length,
    ordersCount: orders.length,
    revenue,
    customersCount: customers.size,
  };
};
