# Content Script example

Content scripts live in an isolated world, allowing a content script to make changes to its JavaScript environment without conflicting with the page or other extensions' content Scripts.

By using the standard DOM, they are able to read details of the web pages the browser visits, make changes to them, and pass information to their parent extension.


1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\content-script"
		}
	]
~~~

2. start Runtime with app.json

3. devtools->console for both main frame and iframe should have

~~~
created by extension for context of ${location.href}
~~~


This example also demonstrates communication between content script to an extension.

For one time request:

1. chrome.runtime.sendMessage is not working as of 6/16/2021 with following error:

~~~
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist
~~~

For long-lived channels from content script to an extension:

1. run the following code in devtools->console of the main frame

~~~
window.addEventListener("message", (event) => console.log('this page got:', event.data))
window.postMessage('hello', '*');
~~~

2. console should show:

~~~
Content script received: hello
this page got: hello
Content script received from extension: hello back from extension
Content script received: hello back from extension
this page got: hello back from extension
~~~

The 'hello' message is sent to the content script, which forwards to the extension.   The extension responds with 'hello back from extension' back to the content script, which forward to the page.