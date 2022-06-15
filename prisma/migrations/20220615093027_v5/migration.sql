-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "photo" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT NOT NULL DEFAULT E'https://toppng.com/uploads/preview/file-svg-profile-icon-vector-11562942678pprjdh47a8.png';
