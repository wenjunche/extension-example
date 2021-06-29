

const queryOptions = {}; // { active: true, currentWindow: true };
chrome.tabs.query(queryOptions, tabs => {
  console.log(`${JSON.stringify(tabs)}`);

  for (const tab of tabs) {
    if (tab.status === 'complete' && !tab.url.startsWith('chrome://')) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tab.id},
          function: getTitle,
        },
        (injectionResults) => {
          if (injectionResults) {
            for (const frameResult of injectionResults) {
              console.log(`Frame Title: ${frameResult.result} for ${tab.url}`);      
            }
          }
        });  
    } else {
      console.log(`tab ${tab.url} status: ${tab.status}`);
    }
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log(`${JSON.stringify(activeInfo)}`);
});

function getTitle() {
  console.log('invoked by extension for document title');
  return document.title;
} 