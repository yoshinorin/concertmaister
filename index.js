const fs = require("fs");
const axios = require("axios");
const { exit } = require("process");
// TODO: from config
const md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
}).use(require('markdown-it-footnote'));
const codeBlockFormatter = require('./libs/codeBlockFormatter');
const { getCredential, getAuthorId, getJwt } = require('./libs/auth');

// TODO: from config
const httpClientWithNonAuth = axios.create({
  baseURL: 'http://localhost:9001/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const authorName = process.argv[2]
const password = getCredential(authorName)
const author = getAuthorId(httpClientWithNonAuth, authorName)

const posts = JSON.parse(fs.readFileSync('./data.json', 'utf8')); // TODO: from config or pass from hexo generate
const wait = (ms) => new Promise(r => setTimeout(r, ms)); // TODO: from config
const maxCnt = 100; // TODO: from config or delete

(async () => {
  const token = await getJwt(httpClientWithNonAuth, author, password)
  console.log(token)
  const httpClientWithAuth = axios.create({
    baseURL: 'http://localhost:9001/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  let c = 1;
  for (let p of posts) {
    if (c > maxCnt) {
      exit(0)
    }
    // TODO: from config
    await wait(500);
    p.htmlContent = md.render(codeBlockFormatter.format(p));

    httpClientWithAuth.post(
      'contents',
      p
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(p.url);
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.headers);
      console.log(error.response.data);
      exit(1);
    });
    c++;
  }
})();
