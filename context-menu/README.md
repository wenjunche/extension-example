# Context Menu example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\context-menu"
		}
	]
~~~

2. start Runtime with app.json

3. highlight any text on the page and right-click to bring up context menu, which should have the following item created in background.js

~~~
Sample Context Menu From Extension
~~~

4.  Select the menu item,  devtools->console for backgroupd script should have
~~~
extesion context menu on ${location-href} with ${selected-text}
~~~

Not working as of 6/15/2021