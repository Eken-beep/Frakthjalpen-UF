import * as universal from '../entries/pages/messages/_page.ts.js';
import * as server from '../entries/pages/messages/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/messages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/messages/+page.ts";
export { server };
export const server_id = "src/routes/messages/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.Cm-6ZqWL.js","_app/immutable/chunks/index.CxTsMWuD.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/svelte-head.LwRMol4i.js"];
export const stylesheets = [];
export const fonts = [];
