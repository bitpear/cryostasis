function copy(o) {
  var out, v, key;
  out = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    out[key] = (typeof v === "object" && v !== null) ? copy(v) : v;
  }
  return out;
}

function Cryostasis(cb = o => o, init) {
  let cryo = {};

  if (init) {
    cryo = copy(init);
  }

  const props = {
    update: {
      value: () => {
        const ret = cb(copy(cryo));

        if (ret instanceof Promise) {
          return ret.then((retPromise) => Object.assign(cryo, retPromise));
        }

        if (typeof ret !== 'object') {
          throw new Error('Error: return value is not an object.');
        }

        return Object.assign(cryo, ret);
      },
    },
    isCryostasis: {
      value: true,
    },
  };

  Object.defineProperties(cryo, props);
  return cryo;
};

module.exports = Cryostasis;
