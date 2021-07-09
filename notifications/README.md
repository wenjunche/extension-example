# Desktop Capture example


1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\desktop-capture"
		}
	]
~~~

2. host notifications/index.html on localhost:9092

3. start Runtime with app.json

4. run
~~~
window.open('http://localhost:9092/index.html');
~~~

5. click on "Create notification" and a notificaion show up.

6. devtools->console for the extension should show logs for onClick, onClose and onButtonClick events from the notification