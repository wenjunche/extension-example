
To test on Windows

1. Load unpack extension and note the extension ID
2. Import Chrome group policies
3. Start gpedit and enable Google->Google Chrome->Extensions->Extension management settings
4. Set the following to Extension management settings:
{"{the-extension-id}":{"testValue":"Hello Managed World"}}
5. Go to chrome://policy/ and check status for ExtensionSettings