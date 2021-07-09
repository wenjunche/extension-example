chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {

  chrome.tabs.query({}, tabs => {
    for (const tab of tabs) {
      if (tab.url.startsWith('http://localhost:9092')) {
        chrome.tabCapture.getMediaStreamId((streamId) => {
          if (!streamId) {
            sendResponse({
              type: 'error',
              message: 'Failed to get stream ID'
            });
          } else {
            sendResponse({
              type: 'success',
              streamId: streamId
            });
          }
        });
      }
    }
  });
  return true;
});