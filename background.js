let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
  });

  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });

  chrome.management.getAll().then(all => {
    all.forEach(ext => {
      console.log(`id: ${ext.id} name: ${ext.name} type: ${ext.type} `)
    })
  });

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log(`extesion context menu on ${tab.url} with ${info.selectionText}`);
});


// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    alert('You just typed "' + text + '"');
  });