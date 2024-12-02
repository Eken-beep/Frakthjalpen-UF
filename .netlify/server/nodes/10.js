import * as server from '../entries/pages/account/saved_posts/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/saved_posts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/account/saved_posts/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.BTMu_74f.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/each.D-z-uRN1.js"];
export const stylesheets = [];
export const fonts = [];
