import { c as attr, s as store_get, u as unsubscribe_stores, p as pop, a as push } from "../../../chunks/index2.js";
/* empty css                  */
import { p as page } from "../../../chunks/stores.js";
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children, data } = $$props;
  $$payload.out += `<div class="mainbox svelte-irc65v">`;
  if (data.user !== null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="main-container svelte-irc65v"><div class="sidebar svelte-irc65v"><ul class="svelte-irc65v"><li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.endsWith("profile") || store_get($$store_subs ??= {}, "$page", page).url.pathname === "/account" ? "page" : void 0)} class="svelte-irc65v"><a href="/account" class="svelte-irc65v">Profil</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.endsWith("location") ? "page" : void 0)} class="svelte-irc65v"><a href="/account/location" class="svelte-irc65v">Plats</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.endsWith("my_posts") ? "page" : void 0)} class="svelte-irc65v"><a href="/account/my_posts" class="svelte-irc65v">Mina annonser</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.endsWith("saved_posts") ? "page" : void 0)} class="svelte-irc65v"><a href="/account/saved_posts" class="svelte-irc65v">Sparade annonser</a></li></ul></div> <div class="content svelte-irc65v">`;
    children($$payload);
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h2>Du är inte inloggad, logga in eller skapa ett konto nedan</h2> <a href="/login" class="svelte-irc65v">Klicka här för att logga in</a>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
