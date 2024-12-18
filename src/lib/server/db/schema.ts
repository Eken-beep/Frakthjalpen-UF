import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { drizzle } from "drizzle-orm/libsql"
import type { Location, Message } from "$lib/types";
 
export const db = drizzle(process.env.DB_FILE_NAME!);
 
export const users = sqliteTable("user", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
    active_conversations: text("active_conversations").$type<Array<number>>(),
    location: text("location").$type<Location>(),
})
 
export const accounts = sqliteTable(
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
        session_token: text("session_token"),
    },
)

export const sessions = sqliteTable("session", {
    userId: text("userId").notNull(),
    session_token: text("session_token").notNull(),
})

export const posts = sqliteTable("post", {
    owner: text("owner").notNull(),
    post_id: integer("post_id").notNull().primaryKey().unique(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    price: integer("price").notNull(),
    bp: integer("bp").notNull(),
    startLocation: text("startLocation", { mode: "json" }).$type<Location>().notNull(),
    endLocation: text("endLocation", { mode: "json" }).$type<Location>().notNull(),
    interestedUsers: text("interestedUsers", { mode: "json" }).$type<Array<string>>(),
    state: text("state").default("normal").notNull(),
    boosts: integer("boosts").notNull().default(0),
})

export const messages = sqliteTable("message", {
    conversation_id: integer("conversation_id").unique().primaryKey().default(0),
    // User ids of participants
    user_a: text("user_a").notNull(),
    user_b: text("user_b").notNull(),

    post_id: integer("post_id").notNull(),

    messages: text("messages", { mode: "json" }).$type<Array<Message>>(),
})
