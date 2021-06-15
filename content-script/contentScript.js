

console.log(`from content script run in context of: ${location.href} `);

const div = document.createElement('div');

div.textContent = `created by extension for context of ${location.href}`;

document.body.appendChild(div);
