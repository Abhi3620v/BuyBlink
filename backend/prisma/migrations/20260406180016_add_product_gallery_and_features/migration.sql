-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "featureList" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
