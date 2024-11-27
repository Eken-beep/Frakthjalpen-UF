import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "turso",
    schema: "./src/lib/server/db/schema.ts",
    out: "./drizzle",

    introspect: {
        casing: "camel",
    },

    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
        authToken: process.env.DB_TOKEN,
    },
});
