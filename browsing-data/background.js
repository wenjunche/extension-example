const millisecondsPerMinute = 1000 * 60;
const oneMinuteAgo = (new Date()).getTime() - millisecondsPerMinute;


chrome.browsingData.remove({
//  "since": oneMinuteAgo,
  "origins": ["https://medium.com"]
}, {
  // "appcache": true,
  // "cache": true,
  // "cacheStorage": true,
  "cookies": true,
  // "downloads": true,
  // "fileSystems": true,
  // "formData": true,
  // "history": true,
  // "indexedDB": true,
  "localStorage": true,
  // "passwords": true,
  // "serviceWorkers": true,
  // "webSQL": true
}, () => {
  console.log('data removed');
});