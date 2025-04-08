
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

// Get individual parameters
const source = params.get('source');
const target = params.get('target');

console.log('source:', source);
console.log('target:', target);

const infoElement = document.getElementById('info');
infoElement.innerText = `Opening location ${source} in Enterprise Browser`;

location.href = target;