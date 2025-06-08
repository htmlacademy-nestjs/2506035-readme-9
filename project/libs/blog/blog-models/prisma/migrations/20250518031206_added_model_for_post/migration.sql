-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('LINK', 'PHOTO', 'QUOTE', 'TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "tags" TEXT[],
    "state" "PostState" NOT NULL DEFAULT 'PUBLISHED',
    "link" TEXT,
    "linkDescription" TEXT,
    "photoUrl" TEXT,
    "quote" TEXT,
    "quoteAuthor" TEXT,
    "title" TEXT,
    "announcement" TEXT,
    "text" TEXT,
    "videoUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRepost" BOOLEAN NOT NULL DEFAULT false,
    "originalPostId" TEXT,
    "originalAuthorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_publishedAt_idx" ON "Post"("publishedAt");

-- CreateIndex
CREATE INDEX "Post_state_publishedAt_idx" ON "Post"("state", "publishedAt");

-- CreateIndex
CREATE INDEX "Post_userId_publishedAt_idx" ON "Post"("userId", "publishedAt");

-- CreateIndex
CREATE INDEX "Post_type_idx" ON "Post"("type");

-- CreateIndex
CREATE INDEX "Post_tags_idx" ON "Post" USING GIN ("tags");
