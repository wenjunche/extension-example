# React Dev Extension


1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\react-dev"
		}
	]
~~~

2. start Runtime with app.json

3. run
~~~
window.open('https://cdn.openfin.co/demos/webrtc/index.html?pairCode=extensionTest');
~~~

4. devtools for the new window should have controls created by React dev extension.
