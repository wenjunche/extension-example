

const ebUrl = 'http://localhost/login';
//const ebBaseUrl = 'http://localhost';
//const ebFinBaseUrl = 'fin://localhost';
let ebEnv;

chrome.runtime.onInstalled.addListener(() => {
  console.log(`onInstalled`);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FROM_EB_SG') {
        console.log("Got message from page:", message);
        if (message.text === 'Authenticated') {
          resetAllRules();
        }
    }
    if (message.type === 'FROM_EB_ENV') {
      ebEnv = message.text;
      console.debug('Received EB env', ebEnv);
      resetAllRules();
    }
  });

  init();

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
  console.debug('updateAllRules');
  const ebBaseUrl = `${ebEnv.startsWith('localhost')?'http':'https'}://${ebEnv}`;
  const ebFinBaseUrl = `${ebEnv.startsWith('localhost')?'fin':'fins'}://${ebEnv}`;
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
}

async function resetAllRules() {
  await clearAllRules();
  await updateAllRules();
}

async function getEBEnv() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['EBENV'], (result) => {
        console.debug('reading EBENV from storage', result);
        resolve(result?.EBENV);
    });
  });
}

async function init() {
  const env = await getEBEnv();
  if (env) {
    console.debug('found EB env', env);
    ebEnv = env;
    resetAllRules();
  } else {
    chrome.windows.create({
       url: "popup.html",
       type: "popup",
       width: 400,
       height: 200
     });
  }
}