

const ebUrl = 'http://localhost/login';
const ebBaseUrl = 'http://localhost';

chrome.runtime.onInstalled.addListener(() => {
  console.log(`onInstalled`);
  /*
  chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
          id: 1,
          priority: 1,
          action: { type: "redirect",  redirect: { url: "fins://qa.is.here.io/platform/api/platform.json?$$launchcontentuuid=186e4e82-f7b2-4ce9-ab6f-9ce05611ad7f" } },
          condition: { urlFilter: "*://*.quora.com/*", resourceTypes: ["script", "main_frame"] }
      }],
      removeRuleIds: [1]
  });
  */
});

chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log(`onBeforeNavigate ${JSON.stringify(details)}`);
  const isMainFrame = detail?.frameType === 'outermost_frame';
  if (isMainFrame && details.url === 'https://www.quora.com/') {
        // Instead of blocking, update the tab's URL
        chrome.tabs.update(details.tabId, { url: ebUrl });
  }
});

chrome.webNavigation.onCommitted.addListener(details => {
  console.log(`onCommitted ${JSON.stringify(details)}`);
});

chrome.webNavigation.onCompleted.addListener(details => {
  console.log(`onCompleted ${JSON.stringify(details)}`);
});


async function getApps() {
  const resp = await fetch(`${ebBaseUrl}/platform/user/apps`);
  if (resp.status === 200) {
    const apps = await resp.json();
    console.log(apps);
    const rules = [];
    for (const app of apps) {
      rules.push(
        {
          id: 1,
          priority: 1,
          action: {
            type: "redirect",
            redirect: { url: "https://new-url.com" }
          },
          condition: {
            urlFilter: "example.com/old",
            resourceTypes: ["main_frame"]
          }
        },        
      );
    }    
  } else {
    chrome.tabs.create({ url: `${ebBaseUrl}/login`});

  }

  // chrome.windows.create({
  //   url: "popup.html",
  //   type: "popup",
  //   width: 400,
  //   height: 500
  // });
}
