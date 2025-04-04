

const ebUrl = 'http://localhost/login';

chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log(`onBeforeNavigate ${JSON.stringify(details)}`);
  const isMainFrame = detail?.frameType === 'outermost_frame';
  if (isMainFrame && details.url === 'https://www.quora.com/') {
        // Instead of blocking, update the tab's URL
        chrome.tabs.update(details.tabId, { url: ebUrl });
  }
});

chrome.webNavigation.onCommitted.addListener(details => {
  console.log(`onCommitted ${JSON.stringify(details)}`);
});

chrome.webNavigation.onCompleted.addListener(details => {
  console.log(`onCompleted ${JSON.stringify(details)}`);
});
