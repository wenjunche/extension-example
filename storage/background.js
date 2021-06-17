const now = new Date();
const key = 'time';

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(`storage changed ${changes} ${namespace}`);
});

chrome.storage.sync.get([key], function(result) {
  console.log(`Value currently is ${JSON.stringify(result)}`);

  chrome.storage.sync.set({key: now}, function() {
    console.log('Value is set to ', now);
  });
  
});
