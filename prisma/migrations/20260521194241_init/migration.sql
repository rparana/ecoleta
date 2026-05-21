-- CreateTable
CREATE TABLE "points" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "point_items" (
    "point_id" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,

    PRIMARY KEY ("point_id", "item_id"),
    CONSTRAINT "point_items_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "point_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
