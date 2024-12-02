import { b as ensure_array_like, c as attr, s as store_get, d as stringify, e as escape_html, u as unsubscribe_stores, p as pop, a as push } from "../../../chunks/index2.js";
/* empty css                  */
import { p as page } from "../../../chunks/stores.js";
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children, data } = $$props;
  const conversations = data.conversations;
  const users = data.users;
  const currentUser = data.currentUser;
  function name(id) {
    for (const user of users) {
      if (user.id === id) return user.name;
    }
  }
  function getConversationName(c) {
    if (currentUser.id === c.user_a) {
      return name(c.user_b);
    } else {
      return name(c.user_a);
    }
  }
  const each_array = ensure_array_like(conversations);
  $$payload.out += `<div class="app svelte-vynmry"><nav class="svelte-vynmry"><h2>Aktiva konversationer</h2> <hr class="svelte-vynmry"> <ul class="svelte-vynmry"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let c = each_array[$$index];
    $$payload.out += `<li class="conversation-card svelte-vynmry"${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.endsWith(String(c.conversation_id)) ? "page" : void 0)}><a${attr("href", `/messages/${stringify(c.conversation_id)}`)} class="svelte-vynmry">${escape_html(getConversationName(c))}</a></li>`;
  }
  $$payload.out += `<!--]--></ul></nav> <main class="svelte-vynmry">`;
  children($$payload);
  $$payload.out += `<!----></main></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
