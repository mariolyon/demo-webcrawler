# Web Crawler
This web crawler will visit a page, and the links contained in it, which are either relative or have the same hostname. External links are ignored.

The implementation is in NodeJs/TypeScript

## How to run
Please use Node v24 as it supports Typescript.

```sh
npm install
node src/index.js SOME_URL #eg SOME_URL https://yahoo.com
```

## How to run tests
```sh
npm run test
```

## How to run tests with coverage
```sh
npm run coverage
```

