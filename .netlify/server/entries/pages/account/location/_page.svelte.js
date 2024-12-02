import { e as escape_html, p as pop, a as push } from "../../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  console.log(data.user);
  const location = data.user.location;
  $$payload.out += `<!---->${escape_html(String(location))}`;
  pop();
}
export {
  _page as default
};
