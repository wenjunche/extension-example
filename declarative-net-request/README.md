# Storage example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\declarative-net-request"
		}
	]
~~~

2. start Runtime with app.json

3. window.open('https://www.quora.com/') should fail with the error of "is blocked".

4. window.open('https://example.com/') should redirect to "https://openfin.co".

