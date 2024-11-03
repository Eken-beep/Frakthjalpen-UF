import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/lib/server/db/schema.ts",
    out: "./drizzle",

    introspect: {
        casing: "camel",
    },

    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
    },
});
