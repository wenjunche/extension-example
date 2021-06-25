const types = [
  'cookies', 'images', 'javascript', 'location', 'popups', 'notifications',
  'microphone', 'camera', 'automaticDownloads'
];
const url = 'https://www.microsoft.com';

chrome.contentSettings['cookies'].set({primaryPattern:'https://*.microsoft.com/*', setting: 'block'});

types.forEach(function(type) {
  chrome.contentSettings[type] && chrome.contentSettings[type].get({
    'primaryUrl': url
  },
  (details) => {
    console.log(`${type}:${details.setting}`)
  });
});

