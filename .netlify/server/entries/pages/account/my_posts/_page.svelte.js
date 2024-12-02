import { e as escape_html, p as pop, a as push, b as ensure_array_like } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
import "../../../../chunks/index.js";
function PostBare($$payload, $$props) {
  push();
  let { post } = $$props;
  let stateText = "";
  switch (post.state) {
    case "normal":
      stateText = "Inget har hänt än";
      break;
    case "waiting":
      stateText = "Väntar på att betalas";
      break;
    case "paid":
      stateText = "Betalt och godkänd av båda, nu är det bara för fraktaren att frakta paketet";
      break;
    default:
      stateText = "";
  }
  $$payload.out += `<h1>${escape_html(post.title)}</h1> <div class="description">${escape_html(post.description)}</div> <div class="location"><span>Från ${escape_html(post.startLocation.adress)}</span> <span>Till ${escape_html(post.endLocation.adress)}</span></div> <h2>${escape_html(post.price)}kr</h2> <div class="descriptor">${escape_html(stateText)}</div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const posts = data.myPosts;
  const each_array = ensure_array_like(posts);
  $$payload.out += `<div class="posts"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let post = each_array[i];
    $$payload.out += `<div class="post-card">`;
    PostBare($$payload, { post });
    $$payload.out += `<!----> <div><button class="modify-post">radera</button> <button class="modify-post">boosta annons</button> <button class="modify-post">Redigera</button></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (posts.length > 1 && i !== posts.length - 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<hr>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
