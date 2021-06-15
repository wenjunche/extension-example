
chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu From Extension",
    "contexts": ["selection"]
  });

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log(`extesion context menu on ${tab.url} with ${info.selectionText}`);
});

