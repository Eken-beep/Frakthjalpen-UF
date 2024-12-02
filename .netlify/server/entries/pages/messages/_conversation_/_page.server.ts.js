import { e as error } from "../../../../chunks/index.js";
import { d as db, m as messages, p as posts } from "../../../../chunks/schema.js";
import { eq } from "drizzle-orm";
import { l as loadSession } from "../../../../chunks/account.js";
import { c as createPaymentSession } from "../../../../chunks/pay.js";
const load = async ({ params, cookies }) => {
  const cid = Number(params.conversation);
  const conversation = await db.select().from(messages).where(eq(messages.conversation_id, cid));
  const currentUser = await loadSession(cookies);
  if (conversation.length !== 1 || currentUser === void 0) {
    error(404, "Not Found");
  }
  return {
    conversation,
    currentUser
  };
};
const actions = {
  send: async (event) => {
    const data = await event.request.formData();
    const sender = await loadSession(event.cookies);
    if (sender === null) {
      return;
    }
    const text = data.get("textmessage");
    if (text === null) {
      return {
        missing: true
      };
    } else if (text === "" || text === " ") {
      return {
        missing: true
      };
    }
    const conversation = await db.select().from(messages).where(eq(messages.conversation_id, Number(event.params.conversation)));
    let allMessages = conversation[0].messages;
    if (allMessages === null) {
      allMessages = [];
    }
    allMessages.push({
      sender: sender.id,
      text,
      read: false
    });
    await db.update(messages).set({ messages: allMessages }).where(eq(messages.conversation_id, conversation[0].conversation_id));
  },
  modify: async (event) => {
    const data = await event.request.formData();
    if (data.get("complete") !== null) {
      const currentUser = await loadSession(event.cookies);
      if (currentUser === null) return;
      const post_id = (await db.select().from(messages).where(eq(messages.conversation_id, Number(event.params.conversation))))[0].post_id;
      const post = await db.select().from(posts).where(eq(posts.post_id, post_id));
      if (post[0].state === "paid" || post[0].state === "done") return;
      if (currentUser.id !== post[0].owner) {
        db.update(posts).set({ state: "waiting" }).where(eq(posts.post_id, post_id));
      } else if (post[0].state === "waiting") {
        const url = event.url.origin;
        await createPaymentSession(post[0], currentUser, url);
      }
    } else {
      const cid = Number(event.params.conversation);
      const deleted = await db.delete(messages).where(eq(messages.conversation_id, cid)).returning();
      const post_id = deleted[0].post_id;
      const post = await db.select().from(posts).where(eq(posts.post_id, post_id));
      let interestedUsers_new = [];
      if (post[0].interestedUsers === null) return;
      for (let i = 0; i < post[0].interestedUsers.length; i++) {
        if (post[0].interestedUsers[i] !== deleted[0].user_a && post[0].interestedUsers[i] !== deleted[0].user_b)
          interestedUsers_new.push(post[0].interestedUsers[i]);
      }
      console.log(interestedUsers_new);
      db.update(posts).set({ interestedUsers: interestedUsers_new }).where(eq(posts.post_id, post_id));
    }
  }
};
export {
  actions,
  load
};
