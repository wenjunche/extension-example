# Storage example

This example tests chrome.webNavigation.

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\web-navigation"
		}
	]
~~~

2. start Runtime with app.json

3. open devtools->console for the extension

4. open another window to https://openfin.co, and devtools-> of the extension should show info on navigation events
