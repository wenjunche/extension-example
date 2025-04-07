document.getElementById('saveBtn').addEventListener('click', () => {
    const ebEnv = document.getElementById('ebEnv').value;
  
    if (ebEnv) {
        chrome.storage.local.set({ EBENV: ebEnv }, () => {
            chrome.runtime.sendMessage({ type: 'FROM_EB_ENV', text: ebEnv }, () => {
                window.close();
            });
        });
    }
  });
  