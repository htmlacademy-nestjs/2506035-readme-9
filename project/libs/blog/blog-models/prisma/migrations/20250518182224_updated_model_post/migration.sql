/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "tags" TEXT[],
    "state" "PostState" NOT NULL DEFAULT 'PUBLISHED',
    "link" TEXT,
    "link_description" TEXT,
    "photo_url" TEXT,
    "quote" TEXT,
    "quote_author" TEXT,
    "title" TEXT,
    "announcement" TEXT,
    "text" TEXT,
    "video_url" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "original_post_id" TEXT,
    "original_author_id" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_published_at_idx" ON "posts"("published_at");

-- CreateIndex
CREATE INDEX "posts_state_published_at_idx" ON "posts"("state", "published_at");

-- CreateIndex
CREATE INDEX "posts_user_id_published_at_idx" ON "posts"("user_id", "published_at");

-- CreateIndex
CREATE INDEX "posts_type_idx" ON "posts"("type");

-- CreateIndex
CREATE INDEX "posts_tags_idx" ON "posts" USING GIN ("tags");
