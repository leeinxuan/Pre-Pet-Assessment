import { C as stripBasePath, S as hasBasePath, _ as withBasePath, a as getPrefetchedUrls, b as require_react, d as createRscRequestHeaders, f as createRscRequestUrl, g as toSameOriginAppPath, h as toBrowserNavigationHref, i as getMountedSlotsHeader, m as resolveRelativeHref, n as getCurrentInterceptionContext, o as navigateClientSide, s as prefetchRscResponse, t as require_jsx_runtime, u as ReadonlyURLSearchParams, v as isDangerousScheme, w as __toESM, x as VINEXT_MOUNTED_SLOTS_HEADER, y as AppElementsWire } from "./ssr.mjs";
import { a as urlQueryToSearchParams, i as getDomainLocaleUrl, r as appendSearchParamsToUrl, t as addLocalePrefix } from "./query-nqHbrvzS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-CHf_5RCd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var _SERVER_INSERTED_HTML_CTX_KEY = Symbol.for("vinext.serverInsertedHTMLContext");
function getServerInsertedHTMLContext() {
	if (typeof import_react.createContext !== "function") return null;
	const globalState = globalThis;
	if (!globalState[_SERVER_INSERTED_HTML_CTX_KEY]) globalState[_SERVER_INSERTED_HTML_CTX_KEY] = import_react.createContext(null);
	return globalState[_SERVER_INSERTED_HTML_CTX_KEY] ?? null;
}
getServerInsertedHTMLContext();
var _GLOBAL_ACCESSORS_KEY = Symbol.for("vinext.navigation.globalAccessors");
var _GLOBAL_HYDRATION_CONTEXT_KEY = Symbol.for("vinext.navigation.clientHydrationContext");
function _getGlobalAccessors() {
	return globalThis[_GLOBAL_ACCESSORS_KEY];
}
function _getClientHydrationContext() {
	const globalState = globalThis;
	if (Object.prototype.hasOwnProperty.call(globalState, _GLOBAL_HYDRATION_CONTEXT_KEY)) return globalState[_GLOBAL_HYDRATION_CONTEXT_KEY] ?? null;
}
var _serverContext = null;
var _getServerContext = () => {
	if (typeof window !== "undefined") {
		const hydrationContext = _getClientHydrationContext();
		return hydrationContext !== void 0 ? hydrationContext : _serverContext;
	}
	const g = _getGlobalAccessors();
	return g ? g.getServerContext() : _serverContext;
};
var isServer = typeof window === "undefined";
var _CLIENT_NAV_STATE_KEY = Symbol.for("vinext.clientNavigationState");
function getClientNavigationState() {
	if (isServer) return null;
	const globalState = window;
	globalState[_CLIENT_NAV_STATE_KEY] ??= {
		listeners: /* @__PURE__ */ new Set(),
		cachedSearch: window.location.search,
		cachedReadonlySearchParams: new ReadonlyURLSearchParams(window.location.search),
		cachedPathname: stripBasePath(window.location.pathname, ""),
		clientParams: {},
		clientParamsJson: "{}",
		pendingClientParams: null,
		pendingClientParamsJson: null,
		pendingPathname: null,
		pendingPathnameNavId: null,
		originalPushState: window.history.pushState.bind(window.history),
		originalReplaceState: window.history.replaceState.bind(window.history),
		patchInstalled: false,
		hasPendingNavigationUpdate: false,
		suppressUrlNotifyCount: 0,
		navigationSnapshotActiveCount: 0
	};
	return globalState[_CLIENT_NAV_STATE_KEY];
}
function notifyNavigationListeners() {
	const state = getClientNavigationState();
	if (!state) return;
	for (const fn of state.listeners) fn();
}
function syncCommittedUrlStateFromLocation() {
	const state = getClientNavigationState();
	if (!state) return false;
	let changed = false;
	const pathname = stripBasePath(window.location.pathname, "");
	if (pathname !== state.cachedPathname) {
		state.cachedPathname = pathname;
		changed = true;
	}
	const search = window.location.search;
	if (search !== state.cachedSearch) {
		state.cachedSearch = search;
		state.cachedReadonlySearchParams = new ReadonlyURLSearchParams(search);
		changed = true;
	}
	return changed;
}
var _EMPTY_PARAMS = {};
var _CLIENT_NAV_RENDER_CTX_KEY = Symbol.for("vinext.clientNavigationRenderContext");
function getClientNavigationRenderContext() {
	if (typeof import_react.createContext !== "function") return null;
	const globalState = globalThis;
	if (!globalState[_CLIENT_NAV_RENDER_CTX_KEY]) globalState[_CLIENT_NAV_RENDER_CTX_KEY] = import_react.createContext(null);
	return globalState[_CLIENT_NAV_RENDER_CTX_KEY] ?? null;
}
function useClientNavigationRenderSnapshot() {
	const ctx = getClientNavigationRenderContext();
	if (!ctx || typeof import_react.useContext !== "function") return null;
	try {
		return import_react.useContext(ctx);
	} catch {
		return null;
	}
}
function getClientParamsSnapshot() {
	return getClientNavigationState()?.clientParams ?? _EMPTY_PARAMS;
}
function getServerParamsSnapshot() {
	return _getServerContext()?.params ?? _EMPTY_PARAMS;
}
function subscribeToNavigation(cb) {
	const state = getClientNavigationState();
	if (!state) return () => {};
	state.listeners.add(cb);
	return () => {
		state.listeners.delete(cb);
	};
}
/**
* Returns the dynamic params for the current route.
*/
function useParams() {
	if (isServer) return _getServerContext()?.params ?? _EMPTY_PARAMS;
	const renderSnapshot = useClientNavigationRenderSnapshot();
	const params = import_react.useSyncExternalStore(subscribeToNavigation, getClientParamsSnapshot, getServerParamsSnapshot);
	if (renderSnapshot && (getClientNavigationState()?.navigationSnapshotActiveCount ?? 0) > 0) return renderSnapshot.params;
	return params;
}
/**
* Commit pending client navigation state to committed snapshots.
*
* navId is optional: callers that don't own pendingPathname (for example,
* superseded pre-paint cleanup) may pass undefined to flush URL/params state
* without clearing pendingPathname owned by the active navigation. Such callers
* must opt in explicitly if they also own an activated render snapshot.
*/
function commitClientNavigationState(navId, options) {
	if (isServer) return;
	const state = getClientNavigationState();
	if (!state) return;
	if ((navId !== void 0 || options?.releaseSnapshot === true) && state.navigationSnapshotActiveCount > 0) state.navigationSnapshotActiveCount -= 1;
	const urlChanged = syncCommittedUrlStateFromLocation();
	if (state.pendingClientParams !== null && state.pendingClientParamsJson !== null) {
		state.clientParams = state.pendingClientParams;
		state.clientParamsJson = state.pendingClientParamsJson;
		state.pendingClientParams = null;
		state.pendingClientParamsJson = null;
	}
	if (state.pendingPathnameNavId === null || navId !== void 0 && state.pendingPathnameNavId === navId) {
		state.pendingPathname = null;
		state.pendingPathnameNavId = null;
	}
	const shouldNotify = urlChanged || state.hasPendingNavigationUpdate;
	state.hasPendingNavigationUpdate = false;
	if (shouldNotify) notifyNavigationListeners();
}
/**
* Restore scroll position from a history state object (used on popstate).
*
* When an RSC navigation is in flight (back/forward triggers both this
* handler and the browser entry's popstate handler which calls
* __VINEXT_RSC_NAVIGATE__), we must wait for the new content to render
* before scrolling. Otherwise the user sees old content flash at the
* restored scroll position.
*
* This handler fires before the browser entry's popstate handler (because
* navigation.ts is loaded before hydration completes), so we defer via a
* microtask to give the browser entry handler a chance to set
* __VINEXT_RSC_PENDING__. Promise.resolve() schedules a microtask
* that runs after all synchronous event listeners have completed.
*/
function restoreScrollPosition(state) {
	if (state && typeof state === "object" && "__vinext_scrollY" in state) {
		const { __vinext_scrollX: x, __vinext_scrollY: y } = state;
		Promise.resolve().then(() => {
			const pending = window.__VINEXT_RSC_PENDING__ ?? null;
			if (pending) pending.then(() => {
				requestAnimationFrame(() => {
					window.scrollTo(x, y);
				});
			});
			else requestAnimationFrame(() => {
				window.scrollTo(x, y);
			});
		});
	}
}
if (!isServer) {
	const state = getClientNavigationState();
	if (state && !state.patchInstalled) {
		state.patchInstalled = true;
		window.addEventListener("popstate", (event) => {
			if (typeof window.__VINEXT_RSC_NAVIGATE__ !== "function") {
				commitClientNavigationState();
				restoreScrollPosition(event.state);
			}
		});
		window.history.pushState = function patchedPushState(data, unused, url) {
			state.originalPushState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
		window.history.replaceState = function patchedReplaceState(data, unused, url) {
			state.originalReplaceState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
	}
}
var PATH_DELIMITER_REGEX = /([/#?\\]|%(2f|23|3f|5c))/gi;
function encodePathDelimiters(segment) {
	return segment.replace(PATH_DELIMITER_REGEX, (char) => encodeURIComponent(char));
}
/**
* Decode a filesystem or URL path segment while preserving encoded path delimiters.
* Mirrors Next.js segment-wise decoding so "%5F" becomes "_" but "%2F" stays "%2F".
*/
function decodeRouteSegment(segment) {
	try {
		return encodePathDelimiters(decodeURIComponent(segment));
	} catch {
		return segment;
	}
}
/**
* Normalize a pathname for route matching by decoding each segment independently.
* This prevents encoded slashes from turning into real path separators.
*/
function normalizePathnameForRouteMatch(pathname) {
	return pathname.split("/").map((segment) => decodeRouteSegment(segment)).join("/");
}
function decodeMatchedParam(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
/**
* Decode captured route params with `decodeURIComponent`, mirroring Next.js
* route-matcher.ts:25-27. Mutates the params object in place. Catch-all
* arrays are decoded element-wise. Malformed escapes are preserved (the
* strict normalization layer rejects them at the request boundary).
*/
function decodeMatchedParams(params) {
	for (const key of Object.keys(params)) {
		const value = params[key];
		if (Array.isArray(value)) params[key] = value.map(decodeMatchedParam);
		else params[key] = decodeMatchedParam(value);
	}
}
function createNode() {
	return {
		staticChildren: /* @__PURE__ */ new Map(),
		dynamicChild: null,
		catchAllChild: null,
		optionalCatchAllChild: null,
		route: null
	};
}
/**
* Build a trie from pre-sorted routes.
*
* Routes must have a `patternParts` property (string[] of URL segments).
* Pattern segment conventions:
*   - `:name`  — dynamic segment
*   - `:name+` — catch-all (1+ segments)
*   - `:name*` — optional catch-all (0+ segments)
*   - anything else — static segment
*
* First route to claim a terminal position wins (routes are pre-sorted
* by precedence, so insertion order preserves correct priority).
*/
function buildRouteTrie(routes) {
	const root = createNode();
	for (const route of routes) {
		const parts = route.patternParts;
		if (parts.length === 0) {
			if (root.route === null) root.route = route;
			continue;
		}
		let node = root;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (part.endsWith("+") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.catchAllChild === null) node.catchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.endsWith("*") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.optionalCatchAllChild === null) node.optionalCatchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.startsWith(":")) {
				const paramName = part.slice(1);
				if (node.dynamicChild === null) node.dynamicChild = {
					paramName,
					node: createNode()
				};
				node = node.dynamicChild.node;
				if (i === parts.length - 1) {
					if (node.route === null) node.route = route;
				}
				continue;
			}
			let child = node.staticChildren.get(part);
			if (!child) {
				child = createNode();
				node.staticChildren.set(part, child);
			}
			node = child;
			if (i === parts.length - 1) {
				if (node.route === null) node.route = route;
			}
		}
	}
	return root;
}
/**
* Match a URL against the trie.
*
* Returns decoded param values — `decodeURIComponent` is applied to
* individual param entries so that `%2F` → `/`, `%23` → `#`, etc.
* Segment boundaries (the original `/` splits) are preserved by the
* upstream normalization layer; this step only decodes the captured
* param strings the caller sees.
*
* Mirrors Next.js route-matcher.ts:25-27.
*
* @param root - Trie root built by `buildRouteTrie`
* @param urlParts - Pre-split URL segments (no empty strings)
* @returns Match result with route and extracted params, or null
*/
function trieMatch(root, urlParts) {
	const result = match(root, urlParts, 0);
	if (result) decodeMatchedParams(result.params);
	return result;
}
function createParams() {
	return Object.create(null);
}
function match(node, urlParts, index) {
	if (index === urlParts.length) {
		if (node.route !== null) return {
			route: node.route,
			params: createParams()
		};
		if (node.optionalCatchAllChild !== null) return {
			route: node.optionalCatchAllChild.route,
			params: createParams()
		};
		return null;
	}
	const segment = urlParts[index];
	const staticChild = node.staticChildren.get(segment);
	if (staticChild) {
		const result = match(staticChild, urlParts, index + 1);
		if (result !== null) return result;
	}
	if (node.dynamicChild !== null) {
		const result = match(node.dynamicChild.node, urlParts, index + 1);
		if (result !== null) {
			result.params[node.dynamicChild.paramName] = segment;
			return result;
		}
	}
	if (node.catchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = createParams();
		params[node.catchAllChild.paramName] = remaining;
		return {
			route: node.catchAllChild.route,
			params
		};
	}
	if (node.optionalCatchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = createParams();
		params[node.optionalCatchAllChild.paramName] = remaining;
		return {
			route: node.optionalCatchAllChild.route,
			params
		};
	}
	return null;
}
/**
* Shared route-match preamble used by both Pages Router and App Router.
*
* Both routers normalize URLs and call `trieMatch` with nearly-identical
* preamble: strip query, trailing-slash normalize, run
* `normalizePathnameForRouteMatch`, split into url parts, then look up via a
* per-routes-array trie cache. This module factors that out so each router
* just calls `matchRouteWithTrie(url, routes)`.
*/
function createRouteTrieCache() {
	return /* @__PURE__ */ new WeakMap();
}
function getOrBuildTrie(cache, routes) {
	let trie = cache.get(routes);
	if (!trie) {
		trie = buildRouteTrie(routes);
		cache.set(routes, trie);
	}
	return trie;
}
/**
* Match a URL path against a list of routes via the shared preamble:
*   1. strip query string
*   2. trailing-slash normalize (preserving root "/")
*   3. run `normalizePathnameForRouteMatch`
*   4. split into url parts and look up via the (cached) trie
*
* Generic over the route shape; both Pages `Route` and App `AppRoute`
* satisfy `{ patternParts: string[] }`.
*/
function matchRouteWithTrie(url, routes, cache) {
	const pathname = url.split("?")[0];
	let normalizedUrl = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
	normalizedUrl = normalizePathnameForRouteMatch(normalizedUrl);
	const urlParts = normalizedUrl.split("/").filter(Boolean);
	return trieMatch(getOrBuildTrie(cache, routes), urlParts);
}
var _getI18nContext = () => {
	if (globalThis.__VINEXT_DEFAULT_LOCALE__ == null && globalThis.__VINEXT_LOCALE__ == null) return null;
	return {
		locale: globalThis.__VINEXT_LOCALE__,
		locales: globalThis.__VINEXT_LOCALES__,
		defaultLocale: globalThis.__VINEXT_DEFAULT_LOCALE__,
		domainLocales: globalThis.__VINEXT_DOMAIN_LOCALES__,
		hostname: globalThis.__VINEXT_HOSTNAME__
	};
};
function getI18nContext() {
	return _getI18nContext();
}
function canLinkPrefetch(input) {
	return input.nodeEnv === "production" && input.prefetch !== false && !input.isDangerous;
}
/**
* Normalize absolute and protocol-relative Link hrefs to app-relative paths
* that are eligible for prefetching. Non-absolute relative hrefs are returned
* unchanged; callers must resolve them against the current browser URL before
* constructing a concrete fetch target.
*/
function getLinkPrefetchHref(input) {
	const { href, basePath, currentOrigin } = input;
	if (!isAbsoluteOrProtocolRelative(href)) return href;
	if (currentOrigin === void 0) return null;
	try {
		const current = new URL(currentOrigin);
		const parsed = href.startsWith("//") ? new URL(href, current.origin) : new URL(href);
		if (parsed.origin !== current.origin) return null;
		if (!basePath) return parsed.pathname + parsed.search + parsed.hash;
		if (!hasBasePath(parsed.pathname, basePath)) return null;
		return stripBasePath(parsed.pathname, basePath) + parsed.search + parsed.hash;
	} catch {
		return null;
	}
}
function isAbsoluteOrProtocolRelative(href) {
	return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}
var import_jsx_runtime = require_jsx_runtime();
/**
* next/link shim
*
* Renders an <a> tag with client-side navigation support.
* On click, prevents full page reload and triggers client-side
* page swap via the router's navigation system.
*/
var LinkStatusContext = (0, import_react.createContext)({ pending: false });
/** basePath from next.config.js, injected by the plugin at build time */
var __basePath = "";
var linkPrefetchRouteTrieCache = createRouteTrieCache();
function resolveHref(href) {
	if (typeof href === "string") return href;
	let url = href.pathname ?? "/";
	if (href.query) {
		const params = urlQueryToSearchParams(href.query);
		url = appendSearchParamsToUrl(url, params);
	}
	return url;
}
function resolveLinkPrefetchMode(prefetchProp, isDangerous) {
	if (isDangerous || prefetchProp === false) return "disabled";
	if (prefetchProp === true) return "full";
	return "auto";
}
function toSameOriginRouteHref(href) {
	if (typeof window === "undefined") return null;
	let url;
	try {
		url = new URL(href, window.location.href);
	} catch {
		return null;
	}
	if (url.origin !== window.location.origin) return null;
	return `${stripBasePath(url.pathname, __basePath)}${url.search}`;
}
function canAutoPrefetchFullAppRoute(href) {
	if (typeof window === "undefined") return false;
	const routes = window.__VINEXT_LINK_PREFETCH_ROUTES__;
	if (!routes) return false;
	const routeHref = toSameOriginRouteHref(href);
	if (routeHref === null) return false;
	const match = matchRouteWithTrie(routeHref, routes, linkPrefetchRouteTrieCache);
	if (!match) return false;
	return !match.route.isDynamic;
}
/**
* Prefetch a URL for faster navigation.
*
* For App Router (RSC): fetches the .rsc payload in the background and
* stores it in an in-memory cache for instant use during navigation.
* For Pages Router: injects a <link rel="prefetch"> for the page module.
*
* Uses `requestIdleCallback` (or `setTimeout` fallback) to avoid blocking
* the main thread during initial page load.
*/
function prefetchUrl(href, mode, priority = "low") {
	if (typeof window === "undefined") return;
	const prefetchHref = getLinkPrefetchHref({
		href,
		basePath: __basePath,
		currentOrigin: window.location.origin
	});
	if (prefetchHref == null) return;
	const fullHref = toBrowserNavigationHref(prefetchHref, window.location.href, __basePath);
	(window.requestIdleCallback ?? ((fn) => setTimeout(fn, 100)))(() => {
		(async () => {
			if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
				if (mode === "auto" && !canAutoPrefetchFullAppRoute(prefetchHref)) return;
				const interceptionContext = getCurrentInterceptionContext();
				const mountedSlotsHeader = getMountedSlotsHeader();
				const headers = createRscRequestHeaders({ interceptionContext });
				if (mountedSlotsHeader) headers.set(VINEXT_MOUNTED_SLOTS_HEADER, mountedSlotsHeader);
				const rscUrl = await createRscRequestUrl(fullHref, headers);
				const cacheKey = AppElementsWire.encodeCacheKey(rscUrl, interceptionContext);
				const prefetched = getPrefetchedUrls();
				if (prefetched.has(cacheKey)) return;
				prefetched.add(cacheKey);
				prefetchRscResponse(rscUrl, fetch(rscUrl, {
					headers,
					credentials: "include",
					priority,
					purpose: "prefetch"
				}), interceptionContext, mountedSlotsHeader);
			} else if (window.__NEXT_DATA__?.__vinext?.pageModuleUrl) {
				const link = document.createElement("link");
				link.rel = "prefetch";
				link.href = fullHref;
				link.as = "document";
				document.head.appendChild(link);
			}
		})().catch((error) => {
			console.error("[vinext] RSC prefetch setup error:", error);
		});
	});
}
/**
* Shared IntersectionObserver for viewport-based prefetching.
* All Link elements use the same observer to minimize resource usage.
*/
var sharedObserver = null;
var observerCallbacks = /* @__PURE__ */ new WeakMap();
function getSharedObserver() {
	if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
	if (sharedObserver) return sharedObserver;
	sharedObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			const callback = observerCallbacks.get(entry.target);
			if (callback) {
				callback();
				sharedObserver?.unobserve(entry.target);
				observerCallbacks.delete(entry.target);
			}
		}
	}, { rootMargin: "250px" });
	return sharedObserver;
}
function getDefaultLocale() {
	if (typeof window !== "undefined") return window.__VINEXT_DEFAULT_LOCALE__;
	return getI18nContext()?.defaultLocale;
}
function getDomainLocales() {
	if (typeof window !== "undefined") return window.__NEXT_DATA__?.domainLocales;
	return getI18nContext()?.domainLocales;
}
function getCurrentHostname() {
	if (typeof window !== "undefined") return window.location.hostname;
	return getI18nContext()?.hostname;
}
function getDomainLocaleHref(href, locale) {
	return getDomainLocaleUrl(href, locale, {
		basePath: __basePath,
		currentHostname: getCurrentHostname(),
		domainItems: getDomainLocales()
	});
}
/**
* Apply locale prefix to a URL path based on the locale prop.
* - locale="fr" → prepend /fr (unless it already has a locale prefix)
* - locale={false} → use the href as-is (no locale prefix, link to default)
* - locale=undefined → use current locale (href as-is in most cases)
*/
function applyLocaleToHref(href, locale) {
	if (locale === false) return href;
	if (locale === void 0) return href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return href;
	const domainLocaleHref = getDomainLocaleHref(href, locale);
	if (domainLocaleHref) return domainLocaleHref;
	return addLocalePrefix(href, locale, getDefaultLocale() ?? "");
}
var Link = (0, import_react.forwardRef)(function Link({ href, as, replace = false, prefetch: prefetchProp, scroll = true, children, onClick, onMouseEnter, onTouchStart, onNavigate, ...rest }, forwardedRef) {
	const { locale, ...restWithoutLocale } = rest;
	const resolvedHref = as ?? resolveHref(href);
	const isDangerous = typeof resolvedHref === "string" && isDangerousScheme(resolvedHref);
	const localizedHref = applyLocaleToHref(isDangerous ? "/" : resolvedHref, locale);
	const fullHref = withBasePath(localizedHref, __basePath);
	const [pending, setPending] = (0, import_react.useState)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const internalRef = (0, import_react.useRef)(null);
	const prefetchMode = resolveLinkPrefetchMode(prefetchProp, isDangerous);
	const shouldPrefetch = canLinkPrefetch({
		nodeEnv: "production",
		prefetch: prefetchProp,
		isDangerous
	});
	const setRefs = (0, import_react.useCallback)((node) => {
		internalRef.current = node;
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef) forwardedRef.current = node;
	}, [forwardedRef]);
	(0, import_react.useEffect)(() => {
		if (!shouldPrefetch || typeof window === "undefined") return;
		const node = internalRef.current;
		if (!node) return;
		const hrefToPrefetch = getLinkPrefetchHref({
			href: localizedHref,
			basePath: __basePath,
			currentOrigin: window.location.origin
		});
		if (hrefToPrefetch == null) return;
		const observer = getSharedObserver();
		if (!observer) return;
		observerCallbacks.set(node, () => prefetchUrl(hrefToPrefetch, prefetchMode, "low"));
		observer.observe(node);
		return () => {
			observer.unobserve(node);
			observerCallbacks.delete(node);
		};
	}, [
		shouldPrefetch,
		prefetchMode,
		localizedHref
	]);
	const prefetchOnIntent = (0, import_react.useCallback)(() => {
		if (!shouldPrefetch) return;
		prefetchUrl(localizedHref, prefetchMode, "high");
	}, [
		shouldPrefetch,
		prefetchMode,
		localizedHref
	]);
	const handleMouseEnter = (0, import_react.useCallback)((e) => {
		onMouseEnter?.(e);
		prefetchOnIntent();
	}, [onMouseEnter, prefetchOnIntent]);
	const handleTouchStart = (0, import_react.useCallback)((e) => {
		onTouchStart?.(e);
		prefetchOnIntent();
	}, [onTouchStart, prefetchOnIntent]);
	const handleClick = async (e) => {
		if (onClick) onClick(e);
		if (e.defaultPrevented) return;
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		if (e.currentTarget.target && e.currentTarget.target !== "_self") return;
		let navigateHref = localizedHref;
		if (resolvedHref.startsWith("http://") || resolvedHref.startsWith("https://") || resolvedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(resolvedHref, __basePath);
			if (localPath == null) return;
			navigateHref = localPath;
		}
		e.preventDefault();
		const absoluteHref = resolveRelativeHref(navigateHref, window.location.href, __basePath);
		const absoluteFullHref = toBrowserNavigationHref(navigateHref, window.location.href, __basePath);
		if (onNavigate) try {
			const navUrl = new URL(absoluteFullHref, window.location.origin);
			let prevented = false;
			const navEvent = {
				url: navUrl,
				preventDefault() {
					prevented = true;
				},
				get defaultPrevented() {
					return prevented;
				}
			};
			onNavigate(navEvent);
			if (navEvent.defaultPrevented) return;
		} catch {}
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
			setPending(true);
			import_react.startTransition(() => {
				navigateClientSide(navigateHref, replace ? "replace" : "push", scroll, true).finally(() => {
					if (mountedRef.current) setPending(false);
				});
			});
			return;
		} else try {
			const Router = (await import("./router-JLlu4Lia.mjs")).default;
			if (replace) await Router.replace(absoluteHref, void 0, { scroll });
			else await Router.push(absoluteHref, void 0, { scroll });
		} catch {
			if (replace) window.history.replaceState({}, "", absoluteFullHref);
			else window.history.pushState({}, "", absoluteFullHref);
			window.dispatchEvent(new PopStateEvent("popstate"));
		}
	};
	const { passHref: _p, ...anchorProps } = restWithoutLocale;
	const linkStatusValue = import_react.useMemo(() => ({ pending }), [pending]);
	if (isDangerous) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...anchorProps,
		onMouseEnter: handleMouseEnter,
		onTouchStart: handleTouchStart,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkStatusContext.Provider, {
		value: linkStatusValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			ref: setRefs,
			href: fullHref,
			onClick: (event) => {
				handleClick(event);
			},
			onMouseEnter: handleMouseEnter,
			onTouchStart: handleTouchStart,
			...anchorProps,
			children
		})
	});
});
var currency = new Intl.NumberFormat("zh-TW");
function SharedResultPage() {
	const params = useParams();
	const [record, setRecord] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!params.id) return;
		fetch(`/api/results/${encodeURIComponent(params.id)}`).then(async (response) => {
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "找不到這份結果");
			setRecord(body);
		}).catch((reason) => setError(reason.message));
	}, [params.id]);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "shared-result-state",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "這份結果目前無法開啟" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/",
				children: "回到伴日子新手村"
			})
		]
	});
	if (!record) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "shared-result-state",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "正在整理照顧準備總覽…" })
	});
	const result = record.result;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "shared-result-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shared-result-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "伴日子新手村 · 分享結果" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [result.petName ? `${result.petName}的` : "我的", "照顧準備總覽"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						result.breedLabel,
						" · ",
						new Date(result.createdAt).toLocaleDateString("zh-TW")
					] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "目前狀態" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: result.readinessLevel })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shared-result-grid",
				"aria-label": "準備狀態摘要",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [result.preparation.roomCompletion, "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "生活空間準備" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: result.preparation.hazardsComplete ? "完成" : "待確認" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "危險物防護" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: result.preparation.transportComplete ? "完成" : "待確認" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "接回與運輸準備" })] })
				]
			}),
			result.discussionTopics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shared-discussion-section",
				"aria-labelledby": "shared-discussion-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shared-section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "△"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "shared-discussion-title",
						children: "建議再深入討論的題目"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這些題目可以特別再複習一次相關的知識點。" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shared-discussion-list",
					children: result.discussionTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "△" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: topic.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: topic.summary ?? topic.topic })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "查看知識點" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: topic.knowledgePoints.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point)) })] }, topic.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shared-all-clear",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "目前沒有需要特別標示的題目" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "仍可以帶著這份摘要和家人討論實際分工與生活安排。" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shared-result-lists",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "已具備的準備" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: result.preparedItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["✓ ", item] }, item)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "接下來要確認" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: result.itemsToConfirm.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "shared-result-costs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "照顧費用摘要" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "費用為互動過程中的模擬估算，實際金額仍需依地區、體型與健康狀況確認。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "模擬支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", currency.format(result.costs.simulatedTotal)] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "醫療應急金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", currency.format(result.costs.emergencyReserve)] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "建議準備金額" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", currency.format(result.costs.suggestedTotal)] })] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "shared-result-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: result.committed ? "✓ 產生連結時，飼主已勾選照顧承諾。" : "這份摘要產生時尚未勾選照顧承諾。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "此分享頁不包含居家照片、家庭成員姓名或其他個人資料。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/",
						children: "我也要做飼主準備度練習"
					})
				]
			})
		]
	});
}
//#endregion
export { SharedResultPage as default };
