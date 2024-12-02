import * as server from '../entries/pages/messages/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/messages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/messages/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.DhiuABgG.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/each.D-z-uRN1.js","_app/immutable/chunks/snippet.BWleBCxv.js","_app/immutable/chunks/attributes.DctazMLN.js","_app/immutable/chunks/stores.C11qThrz.js","_app/immutable/chunks/entry.yCS5PM1n.js","_app/immutable/chunks/index-client.D6PXH4jw.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = ["_app/immutable/assets/3.C1saeH6A.css","_app/immutable/assets/app.C0hVGvF2.css"];
export const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2","_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2","_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff","_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff","_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2","_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff","_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff","_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2","_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff"];
