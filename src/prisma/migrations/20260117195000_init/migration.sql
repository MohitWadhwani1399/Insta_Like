-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);
