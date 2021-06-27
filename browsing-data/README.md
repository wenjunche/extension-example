# Browsing Data example

1. Remove "extensions' from app.json, start Runtime and run 

~~~
window.open('https://medium.com')
~~~

and note cookies created for medium.com in devtools.

2. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\browsering-data"
		}
	]
~~~

3. start Runtime with app.json

4. devtools->console for the extension should show

~~~
data removed
~~~

5. run

~~~
window.open('https://medium.com')
~~~

and all cookies for medium.com should be removed