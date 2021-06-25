# Storage example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\web-request"
		}
	]
~~~

2. start Runtime with app.json

3. open devtools->console for the extension and it should show some events, such as onBeforeRequest, for all http requests

4. window.open('https://www.quora.com/') should fail with error "is blocked"

