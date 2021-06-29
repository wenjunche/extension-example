# Storage example

This example tests cross-origin requests in extensions.

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\cross-origin"
		}
	]
~~~

2. start Runtime with app.json

3. running the following code in devtools->console for the extension should generate CORS error

~~~
let res = await fetch('https://example.com')
~~~

4. running the following code in devtools->console for the extension should work

~~~
let res = await fetch('https://openfin.co')
~~~