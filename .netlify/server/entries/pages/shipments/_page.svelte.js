import { b as ensure_array_like, h as head, e as escape_html, p as pop, a as push } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  const { data } = $$props;
  data.currentUser;
  let posts = [];
  for (const p of data.posts) {
    posts.push(p);
  }
  const each_array = ensure_array_like(posts);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Fraktuppdrag</title>`;
    $$payload2.out += `<meta name="description" content="Tillgängliga fraktuppdrag">`;
  });
  $$payload.out += `<div class="content svelte-1h1aakf">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <h1>Alla fraktuppdrag</h1> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    $$payload.out += `<button class="post-button svelte-1h1aakf"><div class="post svelte-1h1aakf"><h2 class="svelte-1h1aakf">${escape_html(post.title)}</h2> <ul class="svelte-1h1aakf"><li class="svelte-1h1aakf">${escape_html(post.price)} kr</li> <li class="svelte-1h1aakf">Sänds från ${escape_html(post.startLocation.city)} till ${escape_html(post.endLocation.city)}</li> <li class="svelte-1h1aakf">${escape_html(post.description.slice(0, 100))}`;
    if (post.description.length > 100) {
      $$payload.out += "<!--[-->";
      $$payload.out += `...`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></li></ul></div></button>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
