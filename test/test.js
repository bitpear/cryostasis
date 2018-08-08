const assert = require('assert');
const Cryo = require('../');


describe('Cryostasis', function () {
  describe('object', function () {
    const obj = Cryo(() => ({
      value: 123,
    }));

    describe('before #update()', function () {
      it('obj.value should return undefined', function () {
        assert.equal(obj.value, undefined);
      });
    });

    describe('after #update()', function () {
      it('obj.value should return 123', function () {
        obj.update();
        assert.equal(obj.value, 123);
      });
    });
  });

  describe('object with defaults', function () {
    const obj = Cryo(() => ({
      value: 123,
    }), {
      value: 321,
    });

    describe('before #update()', function () {
      it('obj.value should return 321', function () {
        assert.equal(obj.value, 321);
      });
    });

    describe('after #update()', function () {
      it('obj.value should return 123', function () {
        obj.update();
        assert.equal(obj.value, 123);
      });
    });
  });

  describe('array', function () {
    const arr = Cryo(() => ([1, 2, 3]), []);
    describe('before #update()', function () {
      it('arr[0] should return undefined', function () {
        assert.equal(arr[0], undefined);
      });
    });

    describe('after #update()', function () {
      it('arr[0] should return 1', function () {
        arr.update();
        assert.equal(arr[0], 1);
      });

      it('arr[1] should return 1', function () {
        arr.update();
        assert.equal(arr[1], 2);
      });

      it('arr[2] should return 1', function () {
        arr.update();
        assert.equal(arr[2], 3);
      });
    });
  });

  describe('array with defaults', function () {
    const arr = Cryo(() => ([1, 2, 3]), [0000]);

    describe('before #update()', function () {
      it('arr[0] should return 0000', function () {
        assert.equal(arr[0], 0000);
      });
    });

    describe('after #update()', function () {
      it('arr[0] should return 1', function () {
        arr.update();
        assert.equal(arr[0], 1);
      });

      it('arr[1] should return 1', function () {
        arr.update();
        assert.equal(arr[1], 2);
      });

      it('arr[2] should return 1', function () {
        arr.update();
        assert.equal(arr[2], 3);
      });
    });
  });

  describe('promise', function () {
    const obj = Cryo(async () => ({
      value: 00000
    }), {
      value: 99999,
      value1: 0999,
    });

    describe('before #update()', function () {
      it('obj.value should return 99999', function () {
        assert.equal(obj.value, 99999);
      });
    });

    describe('after #update()', function () {
      it('obj.value should return 00000', function (done) {
        obj.update().then(() => {
          assert.equal(obj.value, 00000);
          done();
        });
      });
    });
  });

});