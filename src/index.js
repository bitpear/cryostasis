function copy(o) {
  const out = Array.isArray(o) ? [] : {};
  for (let key in o) {
    let v = o[key];
    out[key] = (typeof v === "object" && v !== null) ? copy(v) : v;
  }
  return out;
}

function resolve(cb, cryo) {
  const ret = cb(cryo);

  if (ret instanceof Promise) {
    return ret.then(retPromise => retPromise ? Object.assign(cryo, retPromise) : cryo);
  }

  return ret ? Object.assign(cryo, ret) : cryo;
}

module.exports = (cb = o => o, init) => {
  let cryo = init ? copy(init) : {};

  const props = {
    update: {
      value: () => {
        if (init && init.isCryostasis) {
          const ret = init.update();
          if (ret instanceof Promise) {
            return ret.then(retPromise => resolve(cb, Object.assign(cryo, retPromise)));
          }

          return resolve(cb, Object.assign(cryo, ret));
        }

        return resolve(cb, cryo);
      },
    },
    isCryostasis: {
      value: true,
    },
  };

  Object.defineProperties(cryo, props);
  return cryo;
};