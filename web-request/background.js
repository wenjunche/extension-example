const urls= ['https://*/*', 'http://*/*'];
const infoSpec = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(`onBeforeRequest ${details.url}`);
    if (details.url === 'https://www.quora.com/') {
      return {cancel: true};
    }
  },
  {urls},
  infoSpec
);

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
