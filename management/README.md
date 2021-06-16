# Management example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\management"
		}
	]
~~~

2. start Runtime with app.json

3. devtools->console for the extension should have

~~~
calling chrome.management.getAll()
background.js:9 total extensions: 2
background.js:11 id: mhipnnjclfgojbdhhjeelhifnenlldil name: Management Example type: extension 
background.js:11 id: efaidnbmnnnibpcajpcglclefindmkaj name: Adobe Acrobat type: extension 
~~~
