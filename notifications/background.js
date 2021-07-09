
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {

  const options = {
    type: "list",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "favicon.ico",
    items: [{ title: "Item1", message: "This is item 1."},
            { title: "Item2", message: "This is item 2."},
            { title: "Item3", message: "This is item 3."}],
    buttons: [
      { title: "button1"},
      { title: "button2"}
    ],
    requireInteraction: true
  };

  chrome.notifications.create(options);

  sendResponse({
    type: 'success'
  });

  return true;
});


chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  console.log(`onButtonClicked ${notificationId} ${buttonIndex}`);
  if (buttonIndex > 0) {
    // close if button2 is cliced
    chrome.notifications.clear(notificationId);
  }    
});

chrome.notifications.onClicked.addListener((notificationId) => {
  console.log(`onClicked ${notificationId}`);
});

chrome.notifications.onClosed.addListener((notificationId) => {
  console.log(`onClosed ${notificationId}`);
});
