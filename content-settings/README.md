# Content Settings example


1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\content-settings"
		}
	]
~~~

2. start Runtime with app.json

3. open devtools->console for the extension and it should show content settings for microsoft.com, such as cookies:block

4. window.open('https://www.microsoft.com') and inspect cookies in devtools.  There should not be any cookies for microsft.com, which is blocked in background.js