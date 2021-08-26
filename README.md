# [WIP] Conmas

Part of CLI for [Qualtet](https://github.com/yoshinorin/qualtet).

Render HTML like Hexo code-block format from markdown with markdown-it.

## Related Repositories

|||
|---|---|
|[Hexo](https://github.com/hexojs/hexo)|CLI for my blog.|
|[Conmas](https://github.com/yoshinorin/conmas)|Assistant CLI tool for POST the Hexo content to Qualtet.|
|[Qualtet](https://github.com/yoshinorin/qualtet)|Server side of blogging system.|
|[Quintet](https://github.com/yoshinorin/quintet)|The front end for Qualtet.|


## Set Credential

Set your credential to OS's keyring.

```
$ node setCredential.js
Please input author name and password: <authorName> <password>
```

## POST a content

```
$ node index.js <authorName>
```
