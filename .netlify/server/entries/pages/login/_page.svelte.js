import { c as attr, p as pop, a as push } from "../../../chunks/index2.js";
import { l as logo } from "../../../chunks/logo_transparent.js";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  console.log(data.user);
  $$payload.out += `<div class="login-box svelte-16c4xjm">`;
  if (data.user === null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<form method="POST" class="svelte-16c4xjm"><ul class="svelte-16c4xjm">`;
    if (form?.success === false) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>Felaktiga inloggningsuppgifter</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <li class="svelte-16c4xjm"><label>Email <input name="email" type="email"${attr("value", form?.email ?? "")} required></label></li> <li class="svelte-16c4xjm"><label>Lösenord <input name="password" type="password" required></label></li> <li class="svelte-16c4xjm"><button style="width: 100%">Logga in</button></li></ul></form> <img${attr("src", logo)} alt="Logo" height="160px"> <span class="svelte-16c4xjm">Har du inget konto? <a href="/register">Klicka här!</a></span>`;
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
