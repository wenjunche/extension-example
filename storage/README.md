# Storage example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\storage"
		}
	]
~~~

2. start Runtime with app.json

3. open devtools->console for the extension and note timestamp that is saved

4. restart Runtime

5. open devtools->console for the extension and it should show timestamp saved during last run.