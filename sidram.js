const pageName = decodeURIComponent(window.location.pathname.split("/").pop());

if (window.parent === window) {
	const wrapper = new URL("header.html", window.location.href);
	wrapper.searchParams.set("page", pageName);
	window.location.replace(wrapper.href);
} else {
	window.parent.postMessage({ type: "page-loaded", page: pageName }, "*");
}
