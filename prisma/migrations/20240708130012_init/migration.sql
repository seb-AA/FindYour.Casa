-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "agentWebsite" TEXT,
ADD COLUMN     "arableLandSize" DOUBLE PRECISION,
ADD COLUMN     "hasGarage" BOOLEAN,
ADD COLUMN     "hasSwimmingPool" BOOLEAN,
ADD COLUMN     "landSize" DOUBLE PRECISION,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "numberOfHabitableBuildings" INTEGER,
ADD COLUMN     "numberOfOtherBuildings" INTEGER;
