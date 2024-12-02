import { h as head } from "../../../chunks/index2.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Meddelanden</title>`;
    $$payload2.out += `<meta name="description" content="Meddelanden">`;
  });
  $$payload.out += `<div class="text-column"><h1>Meddelanden</h1> <h2>Här kan du se alla meddelanden som kunder har skickat till dig</h2></div>`;
}
export {
  _page as default
};
