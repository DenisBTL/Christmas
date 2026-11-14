import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const replies = sqliteTable("replies", {
  token: text("token").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dates: text("dates", { mode: "json" }).$type<string[]>().notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const invitationResponses = sqliteTable("invitation_responses", {
  guestId: text("guest_id").primaryKey(),
  token: text("token").notNull(),
  attendance: text("attendance").notNull(),
  films: text("films", { mode: "json" }).$type<string[]>().notNull(),
  allergyStatus: text("allergy_status").notNull(),
  allergyDetail: text("allergy_detail").notNull(),
  note: text("note").notNull(),
  updatedAt: text("updated_at").notNull(),
});
