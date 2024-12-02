import { r as redirect } from "../../../../chunks/index.js";
import { d as db, p as posts } from "../../../../chunks/schema.js";
import { l as loadSession } from "../../../../chunks/account.js";
let user;
const load = async ({ cookies }) => {
  user = await loadSession(cookies);
  return {
    currentUser: user
  };
};
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    let price;
    let bp = 0;
    {
      const w = data.get("weight");
      if (w < 5) {
        price = 125;
      } else if (5 <= w && w < 10) {
        price = 195;
      } else if (10 <= w && w < 20) {
        price = 255;
      } else {
        price = 300;
      }
    }
    {
      const typeBp = data.get("bp");
      bp = typeBp === "bp_const" ? price / 4 : price * 0.1;
    }
    const startLocation = {
      city: data.get("start_city"),
      postalCode: data.get("start_pcode"),
      adress: data.get("start_adress")
    };
    const endLocation = {
      city: data.get("destination_city"),
      postalCode: data.get("destination_pcode"),
      adress: data.get("destination_adress")
    };
    const timestamp = Date.now();
    await db.insert(posts).values({
      owner: user.id,
      post_id: timestamp,
      title: data.get("title"),
      price: price + bp,
      description: data.get("description"),
      startLocation,
      endLocation
    });
    redirect(303, "/shipments");
  }
};
export {
  actions,
  load
};
