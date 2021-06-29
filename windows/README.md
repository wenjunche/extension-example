# Storage example

This example tests chrome.windows.

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\windows"
		}
	]
~~~

2. start Runtime with app.json

3. devtools->console for the extension should show info about the main window and its tabs

4. open another window to https://example.com, and devtools-> of the extension shouw show

~~~
created {"alwaysOnTop":false,"focused":false,"height":0,"id":42,"incognito":false,"left":0,"state":"normal","top":0,"type":"normal","width":0}
~~~

5. clicking each window and devtools->console of the extension should show change of focus.  Note: not working in Runtime

6. close the window for https://example.com, and devtools-> of the extension shouw show

~~~
removed window_id
~~~

7. chrome.windows.create does not work in Runtime