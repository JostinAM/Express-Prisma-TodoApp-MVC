-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Not Started',
    "description" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'Low'
);
INSERT INTO "new_Todo" ("description", "id", "state", "title") SELECT "description", "id", "state", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
