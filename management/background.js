
console.log('calling chrome.management.getAll()');
chrome.management.getAll().then(all => {
  console.log(`total extensions: ${all.length}`);
  all.forEach(ext => {
    console.log(`id: ${ext.id} name: ${ext.name} type: ${ext.type} `)
  })
});
