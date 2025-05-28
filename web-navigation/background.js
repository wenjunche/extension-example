

const ebUrl = 'http://localhost/login';
//const ebBaseUrl = 'http://localhost';
//const ebFinBaseUrl = 'fin://localhost';
let ebEnv;

const domainMap = new Map();  // domain => fins link for the  content UUID

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
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'managed' && changes.enterpriseBrowserEnvironment) {
    console.log("enterpriseBrowserEnvironment changed from",
                changes.enterpriseBrowserEnvironment.oldValue,
                "to", changes.enterpriseBrowserEnvironment.newValue);
    // @TODO: handle changes to the managed policy
  }
});
  
chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log(`onBeforeNavigate ${JSON.stringify(details)}`);
  const isMainFrame = details?.frameType === 'outermost_frame';
  const redirect = checkUrlWithDomainMap(details.url);
  if (domainMap.size > 0 && redirect) {
      console.debug(`redirect ${details.url} to ${redirect}`);
      const url = chrome.runtime.getURL(redirect);
      chrome.tabs.update(details.tabId, { url });
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
        const url = `${ebFinBaseUrl}/platform/api/platform.json?$$launchcontentuuid=${app.contentId}`;
        rules.push(
          {
            id: ruleId,
            priority: 1,
            action: {
              type: 'redirect',
//              redirect: { url: `${ebFinBaseUrl}/platform/api/platform.json?$$launchcontentuuid=${app.contentId}`}
              redirect: { extensionPath: `/redirect.html?source=${encodeURIComponent(domain)}&target=${encodeURIComponent(url)}` }
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

async function updateDomainMap() {
  console.debug('updateDomainMap');
  const ebBaseUrl = `${ebEnv.startsWith('localhost')?'http':'https'}://${ebEnv}`;
  const ebFinBaseUrl = `${ebEnv.startsWith('localhost')?'fin':'fins'}://${ebEnv}`;
  const resp = await fetch(`${ebBaseUrl}/platform/api/user/apps`);
  if (resp.status === 200) {
    const apps = await resp.json();
    console.log(apps);
    domainMap.clear();
    for (const app of apps) {
      for (const domain of app.domains) {
        const url = `${ebFinBaseUrl}/platform/api/platform.json?$$launchcontentuuid=${app.contentId}`;
        const redirect = `/redirect.html?source=${encodeURIComponent(domain)}&target=${encodeURIComponent(url)}`
        domainMap.set(domain, redirect);
      }
    }
    console.debug('new domain map', domainMap);
  } else {
    console.debug('getApps rejected, trying to log in', resp.status);
    chrome.tabs.create({ url: `${ebBaseUrl}/login`});
  }
}

function checkUrlWithDomainMap(url) {
  for (const [domain, redirect] of domainMap.entries()) {
    if (url.includes(domain)) {  // domain matching. good enough for POC
        console.debug(`${url} matched ${domain}`);
        return redirect;
    }
  }
}

// call these if use declarativeNetRequest
async function resetAllRules() {
  await clearAllRules();
  await updateAllRules();
}

// call this if use webNavigation to redirect
async function resetAllDomainMap() {
  await updateDomainMap();
}

async function getManagedEnv() {
  return new Promise((resolve) => {
    chrome.storage.managed.get(['enterpriseBrowserEnvironment'], function(result) {
      if (chrome.runtime.lastError) {
        console.error("Error reading managed storage:", chrome.runtime.lastError);
        resolve(null);
        return;
      }

      const environment = result.enterpriseBrowserEnvironment;
      if (environment) {
        console.log("Managed Browser Environment:", environment);
        resolve(environment);
      } else {
        console.log("enterpriseBrowserEnvironment policy not set or not found.");
        resolve(null);
      }
    });
  });  
}

async function getEBEnv() {
  const managedEnv = await getManagedEnv();
  if (managedEnv) {
    return managedEnv;
  }
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
    // resetAllRules();      // call this if testing with declarativeNetRequest
    resetAllDomainMap();  // call this if testing with webNavigation
  } else {
    chrome.windows.create({
       url: "popup.html",
       type: "popup",
       width: 400,
       height: 200
     });
  }
}