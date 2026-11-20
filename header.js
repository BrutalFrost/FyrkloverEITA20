const frame = document.querySelector(".page-content");
const links = document.querySelectorAll(".knappar a");

function findPageLink(page) {
	return Array.from(links).find(link => link.getAttribute("href") === page);
}

function markActivePage(page) {
	for (const link of links) {
		link.classList.toggle("active", link.getAttribute("href") === page);
	}
}

window.addEventListener("message", event => {
	if (event.source === frame.contentWindow && event.data?.type === "page-loaded" &&
		findPageLink(event.data.page)) {
		markActivePage(event.data.page);
	}
});

for (const link of links) {
	link.addEventListener("click", () => markActivePage(link.getAttribute("href")));
}

const requestedPage = new URLSearchParams(window.location.search).get("page");
const initialLink = findPageLink(requestedPage) || links[0];
markActivePage(initialLink.getAttribute("href"));
frame.src = initialLink.getAttribute("href");
