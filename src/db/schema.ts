import { text, pgTable, serial, index, integer } from "drizzle-orm/pg-core"

export const file_Table = pgTable(
  "file",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    parent: integer("parent").notNull(),
    size: text("size").notNull(),
  },
  (t) => [index("file_parent_index").on(t.parent)]
)

export const folder_Table = pgTable(
  "folder",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    parent: integer("parent"),
  },
  (t) => [index("folder_parent_index").on(t.parent)]
)
