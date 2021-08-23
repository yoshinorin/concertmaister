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

const posts = JSON.parse(fs.readFileSync('./data.json', 'utf8')); // TODO: from config or pass from hexo generate
const wait = (ms) => new Promise(r => setTimeout(r, ms)); // TODO: from config
const maxCnt = 100; // TODO: from config or delete

// TODO: from config
const httpClient = axios.create({
  baseURL: 'http://localhost:9001/',
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer TODO`
  }
});

(async () => {
  let c = 1;
  for (let p of posts) {
    if (c > maxCnt) {
      exit(0)
    }
    // TODO: from config
    await wait(500);
    p.rawContent = md.render(codeBlockFormatter.format(p));

    httpClient.post('contents', p)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(p.url);
      console.log(error);
      exit(1);
    });
    c++;
  }
})();
