Cryostasys
----------

## Why? 
I don't know.


## Install

```bash
npm install cryostasis
```

## API

```
Cryostasis(<cb(object|array)>|<Promise>, object|array) => object|array
```

## Usage

```javascript
const Cryo = require('cryostasis');

const obj = Cryo(o => {
  o.value += 1;
}, {
  value: 0
});

console.log(obj.value); // expected 0
obj.update();
console.log(obj.value); // expected 1
```


## Examples

### Object

```javascript
const obj = Cryo(() => ({a: 1}));
obj.update();
obj.a;
```

### Array

```javascript
const obj = Cryo(() => (['test']), []);
obj.update();
obj[0];
```

### Promise(async/await) + Object

```javascript
const obj = Cryo(async () => ({a: 1}));
await obj.update();
obj.a;
```

### Promise(async/await) + array

```javascript
const obj = Cryo(async () => (['test']), []);
await obj.update();
obj[0];
```

## Authors

[Marco Rondini](http://twitter.com/white__sheep)


## License Apache 2.0