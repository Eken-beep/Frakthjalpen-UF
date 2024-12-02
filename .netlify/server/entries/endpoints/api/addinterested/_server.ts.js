import { j as json } from "../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import { d as db, p as posts, m as messages, u as users } from "../../../../chunks/schema.js";
async function POST({ request }) {
  const { userId, postId } = await request.json();
  let postdata = (await db.select().from(posts).where(eq(posts.post_id, postId)))[0];
  if (postdata.interestedUsers === null) {
    postdata.interestedUsers = [];
  }
  if (postdata.interestedUsers.filter((value) => value === userId).length === 0 && postdata.owner !== userId) {
    postdata.interestedUsers.push(userId);
    const conversation_id = Date.now();
    await db.insert(messages).values({
      conversation_id,
      user_a: userId,
      user_b: postdata.owner,
      post_id: postdata.post_id
    });
    await addConversation(userId, conversation_id);
    await addConversation(postdata.owner, conversation_id);
  }
  await db.update(posts).set({
    interestedUsers: postdata.interestedUsers
  }).where(eq(posts.post_id, postId));
  return json({ success: true });
}
async function addConversation(userId, conversation_id) {
  const filter = eq(users.id, userId);
  const field = await db.select({
    active_conversations: users.active_conversations
  }).from(users).where(filter);
  if (field[0].active_conversations !== null) {
    let newConversationList = field[0].active_conversations;
    newConversationList.push(conversation_id);
    await db.update(users).set(users.active_conversations).where(filter);
  }
}
export {
  POST
};
