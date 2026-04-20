import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const startServer = async () => {
  await prisma.$connect();

  const server = app.listen(env.port, () => {
    console.log(`BuyBlink backend listening on port ${env.port}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Closing BuyBlink backend...`);
    await prisma.$disconnect();
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
};

startServer().catch(async (error) => {
  console.error("Failed to start BuyBlink backend:", error);
  await prisma.$disconnect();
  process.exit(1);
});
