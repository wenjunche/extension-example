

const ebUrl = 'http://localhost/login';
const ebBaseUrl = 'http://localhost';
const ebFinBaseUrl = 'fin://localhost';

chrome.runtime.onInstalled.addListener(() => {
  console.log(`onInstalled`);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FROM_EB_SG') {
        console.log("Got message from page:", message);
        if (message.text === 'Authenticated') {
          resetAllRules();
        }
    }
  });

  resetAllRules();
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
  const isMainFrame = details?.frameType === 'outermost_frame';
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

async function clearAllRules() {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  const allRuleIds = rules.map(rule => rule.id);
  console.debug('clearing all rules', allRuleIds);
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: allRuleIds
    });
  } catch (err) {
    console.error('Error clearing all rules', err);
    throw err;
  }
}

async function updateAllRules() {
  console.debug('updateAllRules')
  const resp = await fetch(`${ebBaseUrl}/platform/api/user/apps`);
  if (resp.status === 200) {
    const apps = await resp.json();
    console.log(apps);
    let ruleId = 1;
    const rules = [];
    for (const app of apps) {
      for (const domain of app.domains) {
        rules.push(
          {
            id: ruleId,
            priority: 1,
            action: {
              type: 'redirect',
              redirect: { url: `${ebFinBaseUrl}/platform/api/platform.json?$$launchcontentuuid=${app.contentId}`}
            },
            condition: {
              urlFilter: `||${domain}`,
              resourceTypes: ["main_frame"]
            }
          },        
        );
        ruleId += 1;
      }
    }
    console.debug('new rules', rules)
    await chrome.declarativeNetRequest.updateDynamicRules({addRules: rules});
  } else {
    console.debug('getApps rejected, trying to log in', resp.status);
    chrome.tabs.create({ url: `${ebBaseUrl}/login`});
  }

  // chrome.windows.create({
  //   url: "popup.html",
  //   type: "popup",
  //   width: 400,
  //   height: 500
  // });
}

async function resetAllRules() {
  await clearAllRules();
  await updateAllRules();
}
