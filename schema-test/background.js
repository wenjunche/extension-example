

chrome.runtime.onInstalled.addListener(() => {
  console.log(`onInstalled`);
});

chrome.storage.managed.get(['testValue'], function(result) {
  if (chrome.runtime.lastError) {
    console.log("Managed storage error:", chrome.runtime.lastError);
  } else {
    console.log("Managed testValue:", result.testValue);
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'managed' && changes.testValue) {
    console.log('Managed testValue changed:', changes.testValue.newValue);
  }
});