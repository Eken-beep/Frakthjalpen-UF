import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
const client = createClient({
  url: process.env.DB_FILE_NAME,
  authToken: process.env.DB_TOKEN
});
const db = drizzle({ client });
drizzle(process.env.DB_FILE_NAME);
const users = sqliteTable("user", {
  id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  active_conversations: text("active_conversations").$type(),
  location: text("location").$type()
});
const accounts = sqliteTable(
  "account",
  {
    userId: text("userId").notNull(),
    refresh_token: text("refresh_token"),
    // The password hash in our case
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    session_token: text("session_token")
  }
);
const sessions = sqliteTable("session", {
  userId: text("userId").notNull(),
  session_token: text("session_token").notNull()
});
const posts = sqliteTable("post", {
  owner: text("owner").notNull(),
  post_id: integer("post_id").notNull().primaryKey().unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  price: integer("price").notNull(),
  startLocation: text("startLocation", { mode: "json" }).$type().notNull(),
  endLocation: text("endLocation", { mode: "json" }).$type().notNull(),
  interestedUsers: text("interestedUsers", { mode: "json" }).$type(),
  state: text("state").default("normal").notNull()
});
const messages = sqliteTable("message", {
  conversation_id: integer("conversation_id").unique().primaryKey().default(0),
  // User ids of participants
  user_a: text("user_a"),
  user_b: text("user_b"),
  post_id: integer("post_id"),
  messages: text("messages", { mode: "json" }).$type()
});
export {
  accounts as a,
  db as d,
  messages as m,
  posts as p,
  sessions as s,
  users as u
};
