chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  chrome.desktopCapture.chooseDesktopMedia(message.sources, sender.tab, (streamId) => {
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
  return true;
});