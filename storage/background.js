
chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(`storage changed ${JSON.stringify(changes)} ${JSON.stringify(namespace)}`);
});

chrome.storage.sync.get('time', function(result) {
  console.log(`Value currently is ${JSON.stringify(result)}`);
});

chrome.storage.sync.get(null, function(result) {
  console.log(`All Values are ${JSON.stringify(result)}`);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request === 'UpdateTime') {
      const now = Date.now();
      chrome.storage.sync.set({'time': now}, function() {
        console.log('Value is set to ', now);
      });
      sendResponse('Done');
    }
  }
);