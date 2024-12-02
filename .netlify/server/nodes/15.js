import * as universal from '../entries/pages/shipments/_page.ts.js';
import * as server from '../entries/pages/shipments/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shipments/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shipments/+page.ts";
export { server };
export const server_id = "src/routes/shipments/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.C-gZ9Mwb.js","_app/immutable/chunks/index.CxTsMWuD.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/if.CTghanmP.js","_app/immutable/chunks/each.D-z-uRN1.js","_app/immutable/chunks/proxy.CmL6AqeF.js"];
export const stylesheets = ["_app/immutable/assets/15.Bg_En7G2.css"];
export const fonts = [];
