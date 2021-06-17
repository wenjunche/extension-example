
// @TODO does not work in Runtime
// chrome.cookies.getAllCookieStores((stores) => {
//   console.log(`${JSON.stringify(stores)}`);
// })

chrome.cookies.get({url: 'http://localhost:8081/index.html', name: 'sessionid'}, (cookie)=> {
  console.log(`cookie ${JSON.stringify(cookie)}`);
});

// @TODO can't even get getAll work properly in Chrome
// chrome.cookies.getAll({domain: 'localhost'}, (cookies)=> {
//   console.log(`cookies ${cookies.length}`);
//   cookies.forEach(c => {
//     console.log(c);
//   });
// });

const c = {
  name: 'sessionid',
  value: Math.random().toString(36).substring(2, 15),
  url: 'http://localhost:8081/index.html'
};

chrome.cookies.set(c, (result) =>  {
  console.log(`cookie set ${JSON.stringify(result)}`);
});
