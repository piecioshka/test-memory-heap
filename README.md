# test-memory-heap

> :ledger: Testing memory heap when create collections: Object, Array, Map, Set, WeakMap, WeakSet

## Node.js

Use `process.memoryUsage();` in Node.js environment.

```
node index.js
```

## Chromium

BEFORE test run Chromium with special flag:

```
/Applications/Chromium.app/Contents/MacOS/Chromium --enable-precise-memory-info
```

Next open file `index.html` in browser

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2016
