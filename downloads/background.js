
chrome.downloads.onCreated.addListener(function(item) {
  console.log(`download created: ${JSON.stringify(item)}`);
});


chrome.downloads.onChanged.addListener(function(delta) {
  console.log(`download status: ${JSON.stringify(delta)}`);
  if (delta.state && delta.state.current === 'complete') {
    chrome.downloads.show(delta.id);
  }
});

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  console.log(`download onDeterminingFilename: ${JSON.stringify(item)}`);
});
