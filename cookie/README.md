# Cookie example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\cookie"
		}
	]
~~~

2. start Runtime with app.json

3. open devtools->console for the extension and note value of the cookie being set
~~~
cookie set {"domain":"localhost","hostOnly":true,"httpOnly":false,"name":"sessionid","path":"/","sameSite":"unspecified","secure":false,"session":true,"storeId":"0","value":"k4gyodd7vui"}
~~~

4. open devtools->console for the web app and verify the cookie is being set properly.