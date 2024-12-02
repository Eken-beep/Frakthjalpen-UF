import { c as attr, s as store_get, u as unsubscribe_stores, p as pop, a as push } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
/* empty css               */
import "../../chunks/client.js";
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<header class="svelte-190d3je"><div class="corner svelte-190d3je"></div> <nav class="svelte-190d3je"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-190d3je"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-190d3je"></path></svg> <ul class="svelte-190d3je"><li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "page" : void 0)} class="svelte-190d3je"><a href="/" class="svelte-190d3je">Hem</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about" ? "page" : void 0)} class="svelte-190d3je"><a href="/about" class="svelte-190d3je">Om Oss</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/messages") ? "page" : void 0)} class="svelte-190d3je"><a href="/messages" class="svelte-190d3je">Meddelanden</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/shipments") ? "page" : void 0)} class="svelte-190d3je"><a href="/shipments" class="svelte-190d3je">Tillgängliga frakter</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/account") ? "page" : void 0)} class="svelte-190d3je"><a href="/account" class="svelte-190d3je">Konto</a></li></ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-190d3je"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-190d3je"></path></svg></nav> <div class="corner svelte-190d3je"><a href="/shipments/new" class="svelte-190d3je"><button class="newpost svelte-190d3je">Skapa en fraktannons</button></a></div></header>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const menu = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%206H20M4%2012H20M4%2018H20'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
function HeaderMobile($$payload, $$props) {
  push();
  $$payload.out += `<header class="svelte-w7e9bj"><button class="menu-button svelte-w7e9bj"><img${attr("src", menu)} alt="meny" class="svelte-w7e9bj"></button> <a class="newpost svelte-w7e9bj" href="/shipments/new"><button class="newpost svelte-w7e9bj">Skapa en fraktannons</button></a></header> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="app svelte-1apkxa1">`;
  Header($$payload);
  $$payload.out += `<!----> `;
  HeaderMobile($$payload);
  $$payload.out += `<!----> <main class="svelte-1apkxa1">`;
  children($$payload);
  $$payload.out += `<!----></main> <footer class="svelte-1apkxa1"><p>Kontakta oss via <a href="mailto:frakthjalpen.uf@outlook.com" class="svelte-1apkxa1">vår mejladress</a>!</p></footer></div>`;
  pop();
}
export {
  _layout as default
};
