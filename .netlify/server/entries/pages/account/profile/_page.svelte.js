import { h as head, e as escape_html, p as pop, a as push } from "../../../../chunks/index2.js";
import "../../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const user = data["user"];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Konto</title>`;
    $$payload2.out += `<meta name="description" content="Kontoinställningar och information">`;
  });
  $$payload.out += `<ul><li class="svelte-lzag0">Namn: ${escape_html(user.name)}</li> <li class="svelte-lzag0">Mejladress: ${escape_html(user.email)}</li> <li class="svelte-lzag0">Profilbild: ${escape_html(user.image)}</li> <li class="svelte-lzag0"><button data-sveltekit-reload="" class="svelte-lzag0">Logga ut</button></li></ul>`;
  pop();
}
export {
  _page as default
};
