import * as universal from '../entries/pages/about/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.ts";
export const imports = ["_app/immutable/nodes/5.uUWTCG2I.js","_app/immutable/chunks/index.CxTsMWuD.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/svelte-head.LwRMol4i.js"];
export const stylesheets = ["_app/immutable/assets/5.S0xneL8K.css"];
export const fonts = [];
