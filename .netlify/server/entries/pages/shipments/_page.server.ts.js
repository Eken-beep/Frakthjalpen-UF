import { d as db, p as posts } from "../../../chunks/schema.js";
import { l as loadSession } from "../../../chunks/account.js";
const load = async ({ cookies }) => {
  const currentPosts = await db.select().from(posts);
  return {
    currentUser: await loadSession(cookies),
    posts: currentPosts
  };
};
export {
  load
};
