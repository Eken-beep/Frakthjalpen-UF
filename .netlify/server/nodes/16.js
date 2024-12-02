import * as universal from '../entries/pages/shipments/new/_page.ts.js';
import * as server from '../entries/pages/shipments/new/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shipments/new/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shipments/new/+page.ts";
export { server };
export const server_id = "src/routes/shipments/new/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.BzDaORgt.js","_app/immutable/chunks/index.CxTsMWuD.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/if.CTghanmP.js"];
export const stylesheets = ["_app/immutable/assets/16.DOOItI7L.css"];
export const fonts = [];
