import { e as escape_html, c as attr, p as pop, a as push } from "../../../chunks/index2.js";
import { l as logo } from "../../../chunks/logo_transparent.js";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  $$payload.out += `<div class="login-box svelte-o20t45">`;
  if (data.user === null) {
    $$payload.out += "<!--[-->";
    if (form?.success === false) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>${escape_html(form?.message)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <form method="POST" class="svelte-o20t45"><ul class="svelte-o20t45"><li class="svelte-o20t45"><label>För och efternamn <input name="name" type="text"${attr("value", form?.name ?? "")} required></label></li> <li class="svelte-o20t45"><label>Email <input name="email" type="email"${attr("value", form?.email ?? "")} required></label></li> <li class="svelte-o20t45"><label>Lösenord <input name="password" type="password" required></label></li> <li class="svelte-o20t45"><button style="width: 100%">Registrera konto</button></li></ul></form> <img${attr("src", logo)} alt="Logo" height="160px">`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h2>Du är redan inloggad</h2>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
