

console.log(`from content script run in context of: ${location.href} `);

const div = document.createElement('div');

div.textContent = `created by extension for context of ${location.href}`;

document.body.appendChild(div);

// listen to messages from the page
window.addEventListener('message', (event) => {
    console.log('Content script received: ' + event);
    if (event.source !== window) return;
    if (event.data.type === 'FROM_EB_SG') {
        chrome.runtime.sendMessage(event.data);
    }    
}, false);
