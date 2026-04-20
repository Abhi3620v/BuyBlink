-- CreateEnum
CREATE TYPE "SmsLogType" AS ENUM ('ORDER_CONFIRMATION', 'ORDER_STATUS_UPDATE');

-- CreateEnum
CREATE TYPE "SmsLogStatus" AS ENUM ('PREPARED', 'SENT', 'FAILED');

-- AlterEnum
ALTER TYPE "AuditLogAction" ADD VALUE 'ORDER_SMS_SENT';

-- CreateTable
CREATE TABLE "SmsLog" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "SmsLogType" NOT NULL DEFAULT 'ORDER_CONFIRMATION',
    "toPhone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "provider" TEXT,
    "externalId" TEXT,
    "status" "SmsLogStatus" NOT NULL DEFAULT 'PREPARED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmsLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SmsLog_orderId_type_idx" ON "SmsLog"("orderId", "type");

-- AddForeignKey
ALTER TABLE "SmsLog" ADD CONSTRAINT "SmsLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
