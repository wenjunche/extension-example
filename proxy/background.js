
const config = {
  mode: "fixed_servers",
  rules: {
    proxyForHttp: {
      scheme: "http",
      host: "proxy.openfin.co",
      port: 3128
    },
    proxyForHttps: {
      scheme: "https",
      host: "proxy.openfin.co",
      port: 3128
    },
    bypassList: ["localhost:8081"]
  }
};

chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() { 
    console.log(`set proxy to ${JSON.stringify(config)}`);
  }
);
