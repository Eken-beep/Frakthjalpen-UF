import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.B5nimXco.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/if.CTghanmP.js","_app/immutable/chunks/attributes.DctazMLN.js","_app/immutable/chunks/logo_transparent.Bq9owtcH.js"];
export const stylesheets = ["_app/immutable/assets/14.FF2IaCj8.css"];
export const fonts = [];
