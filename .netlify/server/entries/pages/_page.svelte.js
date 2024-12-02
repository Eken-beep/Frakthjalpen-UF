import { h as head } from "../../chunks/index2.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Hem</title>`;
    $$payload2.out += `<meta name="description" content="Svelte demo app">`;
  });
  $$payload.out += `<div class="site-content"><h1 class="svelte-1k1rtak">Välkommen till FraktHjälpen</h1></div>`;
}
export {
  _page as default
};
