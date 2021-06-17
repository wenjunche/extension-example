const now = Date.now();

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(`storage changed ${JSON.stringify(changes)} ${JSON.stringify(namespace)}`);
});

chrome.storage.sync.get('time', function(result) {
  console.log(`Value currently is ${JSON.stringify(result)}`);

  chrome.storage.sync.set({'time': now}, function() {
    console.log('Value is set to ', now);


    chrome.storage.sync.get('time', function(check) {
      console.log(`check value is ${JSON.stringify(check)}`);
    });    
  });
  
});

chrome.storage.sync.get(null, function(result) {
  console.log(`All Values are ${JSON.stringify(result)}`);
});
