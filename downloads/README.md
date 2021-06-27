# Downloads example

1. update app.json to have

~~~
	"extensions": [
		{
			"url": "projects_root\\extension-example\\downloads"
		}
	]
~~~

2. start Runtime with app.json

3. Click on "Download RVM"

4. devtools->console for the extension should show

~~~
download created:
download onDeterminingFilename:
ownload status:
~~~

5. after download is complete,  File Explorer should open to show download location.

6. for "Download Cancalled",  devtools of the extension should show:

~~~
download status: {"error":{"current":"USER_CANCELED"},"id":112,"state":{"current":"interrupted","previous":"in_progress"}}
~~~