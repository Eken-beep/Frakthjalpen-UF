import { h as head } from "../../../chunks/index2.js";
import _page$1 from "./profile/_page.svelte.js";
function _page($$payload, $$props) {
  const { data, form } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Konto</title>`;
    $$payload2.out += `<meta name="description" content="Kontoinställningar och information">`;
  });
  _page$1($$payload, { data, form });
}
export {
  _page as default
};
