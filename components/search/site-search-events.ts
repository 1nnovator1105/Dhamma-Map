/** 어디서든 사이트 검색창을 열 수 있도록 하는 브라우저 이벤트 이름. */
export const openSiteSearchEventName = "dhamma-map:open-site-search";

export function openSiteSearch() {
  window.dispatchEvent(new Event(openSiteSearchEventName));
}
