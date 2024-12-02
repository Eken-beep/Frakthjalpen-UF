import * as universal from '../entries/pages/account/_page.ts.js';
import * as server from '../entries/pages/account/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/account/+page.ts";
export { server };
export const server_id = "src/routes/account/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BYZa_26C.js","_app/immutable/chunks/index.CxTsMWuD.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/nodes/9.DlPIWAm2.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/index.De_1-CT6.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = ["_app/immutable/assets/9.B6nh5Kg_.css"];
export const fonts = [];
