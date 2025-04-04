const urls= ['https://*/*', 'http://*/*'];
const infoSpec = ['blocking'];

const ebUrl = 'fins://qa.is.here.io/platform/api/platform.json?$$launchcontentuuid=186e4e82-f7b2-4ce9-ab6f-9ce05611ad7f';

chrome.runtime.onInstalled.addListener(() => {
  console.log(`onInstalled`);
  /*
  chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
          id: 1,
          priority: 1,
          action: { type: "redirect",  redirect: { url: "fins://qa.is.here.io/platform/api/platform.json?$$launchcontentuuid=186e4e82-f7b2-4ce9-ab6f-9ce05611ad7f" } },
          condition: { urlFilter: "*://*.quora.com/*", resourceTypes: ["script", "main_frame"] }
      }],
      removeRuleIds: [1]
  });
  */
});

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    console.log(`onBeforeRequest ${details.url}`);
    if (details.url === 'https://www.quora.com/') {
        console.log(`Redirecting ${details.url} to ${ebUrl}`);
        // Instead of blocking, update the tab's URL
        // chrome.tabs.update(details.tabId, { url: ebUrl });
        login();
        return; // Prevent further processing
    }
  },
  { urls: ["<all_urls>"] }
  // ["requestBody"] // No blocking supported in non-enterprise installs
);

function login() {
  // chrome.tabs.create({ url: 'http://localhost/login'});
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 400,
    height: 500
});  
}

/* v2
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(`onBeforeRequest ${details.url}`);
    if (details.url === 'https://www.quora.com/') {
      return {cancel: true};
    }
    if (details.url === 'https://www.bbc.com/') {
      return { 'redirectUrl': 'fins://qa.is.here.io/platform/api/platform.json?$$launchcontentuuid=186e4e82-f7b2-4ce9-ab6f-9ce05611ad7f' }
    }
  },
  {urls},
  infoSpec
);
*/
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log(`onBeforeSendHeaders ${details.url}`);
  },
  {urls},
  infoSpec
);

chrome.webRequest.onSendHeaders.addListener(
  function(details) {
    console.log(`onSendHeaders ${details.url}`);
  },
  {urls}
);

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    console.log(`onHeadersReceived ${details.url}`);
  },
  {urls},
  infoSpec
);

chrome.webRequest.onResponseStarted.addListener(
  function(details) {
    console.log(`onResponseStarted ${details.url}`);
  },
  {urls}
);

chrome.webRequest.onCompleted.addListener(
  function(details) {
    console.log(`onCompleted ${details.url}`);
  },
  {urls}
);

chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    console.log(`onErrorOccurred ${details.url}`);
  },
  {urls}
);

