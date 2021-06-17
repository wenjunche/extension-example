

chrome.storage.sync.get('time', function(result) {
    console.log(`ContentScript: Value currently is ${JSON.stringify(result)}`);

    chrome.runtime.sendMessage("UpdateTime", function(response) {
        console.log(`Content script received: ${response}`);
        chrome.storage.sync.get('time', function(result) {
            console.log(`ContentScript: Value currently is ${JSON.stringify(result)}`);
        });
    });    
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log(`ContentScript: storage changed ${JSON.stringify(changes)} ${JSON.stringify(namespace)}`);
});
  
