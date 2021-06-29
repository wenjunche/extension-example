

const queryOptions = { populate: true };
chrome.windows.getAll(queryOptions, windows => {
  console.log(`${JSON.stringify(windows)}`);

});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.windows.get(windowId, {}, w => {
      console.log(`focus on ${JSON.stringify(w)}`);
    });
  } else {
    console.log('focus WINDOW_ID_NONE');
  }
});


chrome.windows.onCreated.addListener(w => {
  console.log(`created ${JSON.stringify(w)}`);
});

chrome.windows.onRemoved.addListener(windowId => {
  console.log(`removed ${windowId}`);
});
