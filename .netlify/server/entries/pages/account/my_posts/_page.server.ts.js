import { f as fail } from "../../../../chunks/index.js";
import { d as db, p as posts } from "../../../../chunks/schema.js";
import { eq } from "drizzle-orm";
import { l } from "../../../../chunks/loadUser.js";
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const postSkeleton = {
      owner: data.get("owner"),
      title: data.get("title"),
      description: data.get("description"),
      price: data.get("price"),
      start_adress: data.get("start_adress"),
      start_pcode: data.get("start_pcode"),
      start_city: data.get("start_city"),
      end_adress: data.get("end_adress"),
      end_pcode: data.get("end_pcode"),
      end_city: data.get("end_city"),
      post_id: data.get("post_id"),
      interestedUsers: data.get("interestedUsers"),
      state: data.get("state")
    };
    for (const field in postSkeleton) {
      if (field === null || field === "")
        return fail(400, { ...postSkeleton, missing: true, success: false });
    }
    const interestedUsersStr = postSkeleton.interestedUsers;
    const newPost = {
      owner: postSkeleton.owner,
      title: postSkeleton.title,
      description: postSkeleton.description,
      price: Number(postSkeleton.price),
      startLocation: {
        adress: postSkeleton.start_adress,
        postalCode: postSkeleton.start_pcode,
        city: postSkeleton.start_city
      },
      endLocation: {
        adress: postSkeleton.end_adress,
        postalCode: postSkeleton.end_pcode,
        city: postSkeleton.end_city
      },
      post_id: Number(postSkeleton.post_id),
      interestedUsers: interestedUsersStr === "null" ? null : JSON.parse(interestedUsersStr),
      state: postSkeleton.state
    };
    await db.update(posts).set(newPost).where(eq(posts.post_id, newPost.post_id));
    return { success: true };
  }
};
export {
  actions,
  l as load
};
