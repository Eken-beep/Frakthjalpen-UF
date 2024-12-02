import { b as ensure_array_like, e as escape_html, p as pop, a as push } from "../../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const posts = data.savedPosts;
  const each_array = ensure_array_like(posts);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    $$payload.out += `<!---->${escape_html(post.title)}`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
