# Storage example

This example tests chrome.tabs and chrome.scripting.

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\tabs"
		}
	]
~~~

2. start Runtime with app.json

3. from the main window, run window.open('https://example.com')

4. open chrome://extensions and reload Tabs Example

5. devtools->console for the extension should show

~~~
[{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"groupId":-1,"height":561,"highlighted":true,"id":2,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"unloaded","title":"","url":"","width":784,"windowId":1},{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"http://localhost:8081/favicon.ico","groupId":-1,"height":561,"highlighted":true,"id":24,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"complete","title":"Testing Extensions in Runtime","url":"http://localhost:8081/index.html","width":484,"windowId":23},{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"groupId":-1,"height":461,"highlighted":true,"id":27,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"complete","title":"Example Domain","url":"https://example.com/","width":784,"windowId":28},{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"","groupId":-1,"height":461,"highlighted":true,"id":30,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"complete","title":"Extensions","url":"chrome://extensions/","width":784,"windowId":29}]
background.js:22 tab  status: unloaded
background.js:22 tab chrome://extensions/ status: complete
background.js:17 Frame Title: Testing Extensions in Runtime for http://localhost:8081/index.html
background.js:17 Frame Title: Example Domain for https://example.com/
~~~

6. devtools->console for example.com should show

~~~
invoked by extension for document title
~~~