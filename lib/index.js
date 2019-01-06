'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }),
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var fs = require('fs');

var _require = require('canvas'),
  createCanvas = _require.createCanvas,
  loadImage = _require.loadImage;

var shuffleSeed = require('shuffle-seed');

var LoadData =
  /*#__PURE__*/
  (function() {
    function LoadData(path, labels, options) {
      _classCallCheck(this, LoadData);

      this.path = path;
      this.labels = labels;
      this.options = _objectSpread(
        {
          shuffle: true,
          batchSize: 10,
          trainSize: 100,
          labelRegExp: RegExp(/[^.]*/),
          shufflePhrase: 'phrase',
          silentMode: false,
        },
        options,
      );
      this.trainData = [];
      this.alreadyLoaded = 0;
      this.loadImagesNames();
    }

    _createClass(LoadData, [
      {
        key: 'loadImagesNames',
        value: function loadImagesNames() {
          var data = fs.readdirSync(this.path, function(err, files) {
            return files;
          });

          if (data.length < this.options.trainSize) {
            // TODO: THROW ERROR
          }

          if (this.options.shuffle) {
            data = shuffleSeed.shuffle(data, this.options.shufflePhrase);
          }

          this.trainData = data;
        },
      },
      {
        key: 'loadLabelAndImage',
        value: (function() {
          var _loadLabelAndImage = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var labelRegExp, singleImage, label, image, newCanvas, ctx;
              return regeneratorRuntime.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        if (!(this.trainData.length === 0)) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt('return', false);

                      case 2:
                        labelRegExp = this.options.labelRegExp;
                        singleImage = this.trainData.shift();
                        this.alreadyLoaded += 1;
                        label = labelRegExp.exec(singleImage)[0];
                        _context.next = 8;
                        return loadImage(''.concat(this.path, '/').concat(singleImage));

                      case 8:
                        image = _context.sent;
                        newCanvas = createCanvas(image.width, image.height);
                        ctx = newCanvas.getContext('2d');
                        ctx.drawImage(image, 0, 0);
                        this.logs('Image');
                        return _context.abrupt('return', {
                          label: label,
                          image: newCanvas,
                        });

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
              );
            }),
          );

          function loadLabelAndImage() {
            return _loadLabelAndImage.apply(this, arguments);
          }

          return loadLabelAndImage;
        })(),
      },
      {
        key: 'loadBatchSizeImages',
        value: (function() {
          var _loadBatchSizeImages = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var labels, features, batchSize, i, _ref, label, feature;

              return regeneratorRuntime.wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        labels = [];
                        features = [];
                        batchSize = this.options.batchSize;
                        i = 0;

                      case 4:
                        if (!(i < batchSize)) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 7;
                        return this.loadLabelAndImage();

                      case 7:
                        _ref = _context2.sent;
                        label = _ref.label;
                        feature = _ref.feature;
                        // TODO: secure in case of empty label/feature
                        labels.push(this.labels[label]);
                        features.push(feature);

                      case 12:
                        i += 1;
                        _context2.next = 4;
                        break;

                      case 15:
                        this.logs('Batch');
                        return _context2.abrupt('return', {
                          labels: labels,
                          features: features,
                        });

                      case 17:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                },
                _callee2,
                this,
              );
            }),
          );

          function loadBatchSizeImages() {
            return _loadBatchSizeImages.apply(this, arguments);
          }

          return loadBatchSizeImages;
        })(),
      },
      {
        key: 'logs',
        value: function logs(type, label) {
          if (!this.options.silentMode) {
            switch (type) {
              case 'Image':
                console.log('Loaded '.concat(label));
                break;

              case 'Batch':
                console.log(
                  'Loaded already '.concat((this.alreadyLoaded / this.trainData.length) * 100, '%'),
                );
                break;

              default:
            }
          }
        },
      },
    ]);

    return LoadData;
  })();

module.exports = LoadData;
