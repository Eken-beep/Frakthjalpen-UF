export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/logo_transparent.svg","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.P3y02T_E.js","app":"_app/immutable/entry/app.BsiAaI3e.js","imports":["_app/immutable/entry/start.P3y02T_E.js","_app/immutable/chunks/entry.yCS5PM1n.js","_app/immutable/chunks/index-client.D6PXH4jw.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.BsiAaI3e.js","_app/immutable/chunks/runtime.TY3CBj5G.js","_app/immutable/chunks/render.BzwIAm1X.js","_app/immutable/chunks/events.BxZN8xIg.js","_app/immutable/chunks/svelte-head.LwRMol4i.js","_app/immutable/chunks/disclose-version.7lq4aikT.js","_app/immutable/chunks/if.CTghanmP.js","_app/immutable/chunks/proxy.CmL6AqeF.js","_app/immutable/chunks/index-client.D6PXH4jw.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/account/location",
				pattern: /^\/account\/location\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/account/my_posts",
				pattern: /^\/account\/my_posts\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/account/profile",
				pattern: /^\/account\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/account/saved_posts",
				pattern: /^\/account\/saved_posts\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/api/addinterested",
				pattern: /^\/api\/addinterested\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/addinterested/_server.ts.js'))
			},
			{
				id: "/api/logout",
				pattern: /^\/api\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/logout/_server.ts.js'))
			},
			{
				id: "/api/modify_post",
				pattern: /^\/api\/modify_post\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/modify_post/_server.ts.js'))
			},
			{
				id: "/api/verify_payment",
				pattern: /^\/api\/verify_payment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/verify_payment/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/messages",
				pattern: /^\/messages\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/messages/[conversation]",
				pattern: /^\/messages\/([^/]+?)\/?$/,
				params: [{"name":"conversation","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/shipments",
				pattern: /^\/shipments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/shipments/new",
				pattern: /^\/shipments\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
