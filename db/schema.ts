import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const replies = sqliteTable("replies", {
  token: text("token").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dates: text("dates", { mode: "json" }).$type<string[]>().notNull(),
  updatedAt: text("updated_at").notNull(),
});
