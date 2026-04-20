-- AlterEnum
ALTER TYPE "PaymentProvider" ADD VALUE 'RAZORPAY';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "gatewayOrderId" TEXT,
ADD COLUMN     "gatewayPaymentId" TEXT,
ADD COLUMN     "gatewaySignature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_gatewayOrderId_key" ON "Payment"("gatewayOrderId");

-- CreateIndex
CREATE INDEX "Payment_gatewayPaymentId_idx" ON "Payment"("gatewayPaymentId");
