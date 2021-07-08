# Desktop Capture example


1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\desktop-capture"
		}
	]
~~~

2. host desktop-capture/index.html on localhost:9092

3. start Runtime with app.json

4. run
~~~
window.open('http://localhost:9092/index.html');
~~~

5. click on "Get the screen" and select "what to share"