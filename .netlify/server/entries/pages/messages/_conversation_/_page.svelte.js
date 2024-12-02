import { b as ensure_array_like, c as attr, e as escape_html, p as pop, a as push } from "../../../../chunks/index2.js";
/* empty css                     */
import { r as redirect } from "../../../../chunks/index.js";
import "@stripe/stripe-js";
const paperplane = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%20xml:space='preserve'%3e%3cg%3e%3cg%3e%3cpath%20d='M502.691,9.309C496.873,3.491,488.727,0,480.582,0c-11.636,0-23.273,2.327-33.745,6.982L18.618,182.691%20C6.982,187.345,0,197.818,0,209.455c0,11.636,6.982,22.109,18.618,26.764l140.8,53.527c5.818,2.327,12.8-1.164,15.127-6.982%20c2.327-5.818-1.164-12.8-6.982-15.127l-140.8-53.527c-2.327,0-3.491-2.327-3.491-4.655c0-2.327,1.164-4.655,3.491-4.655%20L456.145,27.927c8.146-3.491,16.291-4.655,24.436-4.655c2.327,0,4.655,1.164,5.818,2.327s2.327,3.491,2.327,5.818%20c0,8.145-1.164,16.291-4.655,24.436L307.2,485.236c-1.164,3.491-8.145,4.655-10.473,0l-74.473-180.364l193.164-192%20c4.655-4.655,4.655-11.636,0-16.291c-4.655-4.655-11.636-4.655-16.291,0L201.309,294.4c-2.327,2.327-3.491,4.655-3.491,8.145%20v116.364c0,6.982,4.655,11.636,11.636,11.636c6.982,0,11.636-4.655,11.636-11.636v-57.018l54.691,132.655%20C280.436,505.018,290.909,512,302.545,512s22.109-6.982,26.764-18.618L505.018,65.164C509.673,54.691,512,43.055,512,31.418%20C512,23.273,508.509,15.127,502.691,9.309z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let conversation = data.conversation[0];
  let messages = conversation.messages;
  let currentUser = data.currentUser;
  if (currentUser === null) {
    redirect(303, "/");
  }
  const each_array = ensure_array_like(messages);
  $$payload.out += `<div class="conversation svelte-1v9noph"><div class="messages svelte-1v9noph"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let message = each_array[$$index];
    $$payload.out += `<div class="message svelte-1v9noph"${attr("aria-label", message.sender === currentUser.id ? "me" : "other")}><span class="bubble svelte-1v9noph">${escape_html(message.text)}</span></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="message-send svelte-1v9noph"><form action="?/modify" method="POST" class="modify-conversation-desktop svelte-1v9noph"><input class="cc svelte-1v9noph" type="submit" name="complete" value="Acceptera"> <input class="cc svelte-1v9noph" type="submit" name="end" value="Avsluta"></form> <form action="?/send" method="POST" class="svelte-1v9noph"><input name="textmessage" type="text" class="textbox svelte-1v9noph" placeholder="Meddelande"> <button type="submit" name="Skicka" value="" class="send svelte-1v9noph"><img${attr("src", paperplane)} alt="skicka" width="100%" class="svelte-1v9noph"></button></form></div></div>`;
  pop();
}
export {
  _page as default
};
