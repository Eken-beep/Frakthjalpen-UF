import { h as head, p as pop, a as push } from "../../../../chunks/index2.js";
function _page($$payload, $$props) {
  push();
  const { data, form } = $$props;
  const user = data["currentUser"];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Skapa Fraktannons</title>`;
    $$payload2.out += `<meta name="description" content="Skapa en ny fraktanons">`;
  });
  $$payload.out += `<div class="mainbox svelte-1ecuujk">`;
  if (user === null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1>Logga in för att skapa en annons</h1>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h1>Skapa en ny fraktannons</h1> <form method="POST"><label class="svelte-1ecuujk">Annonstitel <input name="title" type="text" required class="svelte-1ecuujk"></label> <label class="svelte-1ecuujk">Paketets vikt <input name="weight" type="number" style="width:3em; margin: 0.5em" required class="svelte-1ecuujk"> Kg</label> <br> <fieldset class="svelte-1ecuujk"><legend>Välj typ av köpskydd</legend> <span><label class="svelte-1ecuujk"><input class="radio svelte-1ecuujk" type="radio" name="bp" value="bp_const" checked> Fast köpskydd</label></span><br> <span><label class="svelte-1ecuujk"><input class="radio svelte-1ecuujk" type="radio" name="bp" value="bp_flex"> Rörligt köpskydd</label></span> <p>Läs mer om köpskydd <a href="/about">här</a></p></fieldset> <label class="svelte-1ecuujk">Beskrivning <br> <textarea name="description" cols="60" class="svelte-1ecuujk"></textarea></label> <div class="location-chooser svelte-1ecuujk"><div class="svelte-1ecuujk"><h2>Upphämtningsplats</h2> <label class="svelte-1ecuujk">Stad/Postort <input name="start_city" type="text" required class="svelte-1ecuujk"></label> <label class="svelte-1ecuujk">Postadress <input name="start_pcode" type="text" required class="svelte-1ecuujk"></label> <label class="svelte-1ecuujk">Adress och gatunummer <input name="start_adress" type="text" required class="svelte-1ecuujk"></label></div> <div class="svelte-1ecuujk"><h2>Avlämningsplats</h2> <label class="svelte-1ecuujk">Stad/Postort <input name="destination_city" type="text" required class="svelte-1ecuujk"></label> <label class="svelte-1ecuujk">Postadress <input name="destination_pcode" type="text" required class="svelte-1ecuujk"></label> <label class="svelte-1ecuujk">Adress och gatunummer <input name="destination_adress" type="text" required class="svelte-1ecuujk"></label></div></div> <label class="svelte-1ecuujk"><input type="submit" value="Ladda upp annons" class="svelte-1ecuujk"></label></form>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
