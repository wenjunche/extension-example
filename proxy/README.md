# Proxy Page example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\proxy"
		}
	]
~~~

2. start Runtime with app.json

3. open devtoos for the extension and it should show:

~~~
set proxy to {"mode":"fixed_servers","rules":{"proxyForHttp":{"scheme":"http","host":"proxy.proxy.co","port":3128},"proxyForHttps":{"scheme":"https","host":"proxy.proxy.co","port":3128},"bypassList":["localhost:8081"]}}
~~~

4. a call to window.open('any_url_not_localhost:8081') should fail with a proxy server error.