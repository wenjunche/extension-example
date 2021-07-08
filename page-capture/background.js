const queryOptions =  {}; // { active: false, currentWindow: true };
chrome.tabs.query(queryOptions, tabs => {
  console.log(`${JSON.stringify(tabs)}`);

  for (const tab of tabs) {
    if (tab.status === 'complete' && tab.url && tab.url.startsWith('http://localhost')) {
      chrome.pageCapture.saveAsMHTML({
        tabId: tab.id
      }, (buffer) => {
        // Chrome doc says buffer is ArrayBuffer,  but it is actually Blob
        console.log(`buffer size ${buffer.size} for ${tab.url}`);
      });
    } 
  }
});

