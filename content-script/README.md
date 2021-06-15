# Content Script example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\content-script"
		}
	]
~~~

2. start Runtime with app.json

3. both main frame and iframe should have

~~~
created by extension for context of ${location.href}
~~~
