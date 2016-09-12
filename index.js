var unit = ['', 'K', 'M', 'G', 'T', 'P'];

function bytesToSize(input, precision) {
    if (input === 0) return '0B';
    var index = Math.floor(Math.log(input) / Math.log(1024));
    if (unit >= unit.length) return input + ' B';
    return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
}

function testNode(label, callback) {
    var start = process.memoryUsage();
    callback();
    var end = process.memoryUsage();

    var rss = end.rss - start.rss;
    var heapTotal = end.heapTotal - start.heapTotal;
    var heapUsed = end.heapUsed - start.heapUsed;

    console.log(label);
    console.log("rss: " + bytesToSize(rss, 3) + ' (' + rss + ')');
    console.log("heapTotal: " + bytesToSize(heapTotal, 3) + ' (' + heapTotal + ')');
    console.log("heapUsed: " + bytesToSize(heapUsed, 3) + ' (' + heapUsed + ')');
    console.log("");
}

function testChrome(label, callback) {
    var start = performance.memory;
    callback();
    var end = performance.memory;

    var totalJSHeapSize = end.totalJSHeapSize - start.totalJSHeapSize;
    var usedJSHeapSize = end.usedJSHeapSize - start.usedJSHeapSize;
    var jsHeapSizeLimit = end.jsHeapSizeLimit - start.jsHeapSizeLimit;

    console.log(label);
    console.log("totalJSHeapSize: " + bytesToSize(totalJSHeapSize, 3) + ' (' + totalJSHeapSize + ')');
    console.log("usedJSHeapSize: " + bytesToSize(usedJSHeapSize, 3) + ' (' + usedJSHeapSize + ')');
    console.log("jsHeapSizeLimit: " + bytesToSize(jsHeapSizeLimit, 3) + ' (' + jsHeapSizeLimit + ')');
    console.log("");
}

function test(label, callback) {
    if (typeof process === 'undefined') {
        return testChrome.apply(this, arguments);
    } else {
        return testNode.apply(this, arguments);
    }
}

var specs = {};

specs.Object = function () {
    return { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 0 };
};

specs.Array = function () {
    return [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }, { f: 6 }, { g: 7 }, { h: 8 }, { i: 9 }, { j: 0 }];
};

specs.Map = function () {
    let a = new Map();
    a.set({ a: 1 }).set({ b: 2 }).set({ c: 3 }).set({ d: 4 }).set({ e: 5 }).set({ f: 6 }).set({ g: 7 }).set({ h: 8 }).set({ i: 9 }).set({ j: 0 });
    return a;
};

specs.Set = function () {
    let a = new Set();
    a.add({ a: 1 }).add({ b: 2 }).add({ c: 3 }).add({ d: 4 }).add({ e: 5 }).add({ f: 6 }).add({ g: 7 }).add({ h: 8 }).add({ i: 9 }).add({ j: 0 });
    return a;
};

specs.WeakMap = function () {
    let a = new WeakMap([]);
    a.set({ a: 1 }).set({ b: 2 }).set({ c: 3 }).set({ d: 4 }).set({ e: 5 }).set({ f: 6 }).set({ g: 7 }).set({ h: 8 }).set({ i: 9 }).set({ j: 0 });
    return a;
};

specs.WeakSet = function () {
    let a = new WeakSet([]);
    a.add({ a: 1 }).add({ b: 2 }).add({ c: 3 }).add({ d: 4 }).add({ e: 5 }).add({ f: 6 }).add({ g: 7 }).add({ h: 8 }).add({ i: 9 }).add({ j: 0 });
    return a;
};

Object.keys(specs).forEach((type) => {
    test(type, specs[type]);
});
