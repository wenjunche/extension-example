

console.log(`from content script run in context of: ${location.href} `);

const div = document.createElement('div');

div.textContent = `created by extension for context of ${location.href}`;

document.body.appendChild(div);

const div1 = document.getElementById('div1');
if (div1) {
    div1.innerText = `set by extension for context of ${location.href}`;
}

// Communication with extensions
// connect to the extension
const port = chrome.runtime.connect({name: location.href});
port.onMessage.addListener((message) => {
    console.log('Content script received from extension: ' + message);
    // forward to the page
    window.postMessage(message, '*');
});

// listen to messages from the page
window.addEventListener('message', (event) => {  
    console.log('Content script received: ' + event.data);
    // foward to the extension
    port.postMessage(event.data);
}, false);