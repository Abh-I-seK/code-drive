import { InferSelectModel } from "drizzle-orm"
import { text, pgTable, serial, index, integer, timestamp } from "drizzle-orm/pg-core"

export const file_Table = pgTable(
  "file",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    parent: integer("parent").notNull(),
    size: text("size").notNull(),
    created_at : timestamp("created_at").defaultNow(),
    ownerId : text("ownerId").notNull(),
  },
  (t) => [
    index("file_parent_index").on(t.parent),
    index("file_ownerId_index").on(t.ownerId),
  ]
)

export type file_type = InferSelectModel<typeof file_Table>

export const folder_Table = pgTable(
  "folder",
  {
    id: serial("id").primaryKey(),
    ownerId : text("ownerId").notNull(),
    name: text("name").notNull(),
    parent: integer("parent"),
    created_at : timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("folder_parent_index").on(t.parent),
    index("folder_ownerId_index").on(t.ownerId),
  ]
)

export type folder_type = InferSelectModel<typeof folder_Table>;