
chrome.runtime.onInstalled.addListener(() => {
});

// long live connection
chrome.runtime.onConnect.addListener(function(port) {
  console.log(`connected with ${port.name}`);
  port.onMessage.addListener(function(msg) {
    console.log(`message from ${port.name}: ${msg}`);
    if (msg === 'hello') {
      port.postMessage('hello back from extension');
    }
  });
});

// one time message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request === 'short hello') {
      sendResponse('short hello back');
    }
  }
);