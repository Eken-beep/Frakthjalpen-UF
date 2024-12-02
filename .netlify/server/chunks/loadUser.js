import { l as loadSession } from "./account.js";
import { d as db, p as posts } from "./schema.js";
import { eq, isNotNull } from "drizzle-orm";
const load = async ({ cookies }) => {
  const currentUser = await loadSession(cookies);
  if (currentUser === null) {
    return {
      user: currentUser,
      myPosts: null,
      savedPosts: null
    };
  }
  const myPosts = await db.select().from(posts).where(eq(posts.owner, currentUser.id));
  let allPostsInterestedUsers = await db.select().from(posts).where(isNotNull(posts.interestedUsers));
  allPostsInterestedUsers.filter(
    (value) => value.interestedUsers.includes(currentUser.id)
  );
  return {
    user: currentUser,
    myPosts,
    savedPosts: allPostsInterestedUsers
  };
};
export {
  load as l
};
