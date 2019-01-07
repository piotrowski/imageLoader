import '@babel/polyfill';

import { createCanvas, loadImage } from 'canvas';

import fs from 'fs';
import shuffleSeed from 'shuffle-seed';

export default class LoadImages {
  constructor(path, labels, options) {
    this.path = path;
    this.labels = labels;
    this.options = {
      shuffle: true,
      shufflePhrase: 'phrase',

      batchSize: 10,
      trainSize: 100,

      labelRegExp: RegExp(/[^.]*/),
      extentionsRegExp: RegExp(/\.(jpg|png|jpeg)$/),

      silentMode: true,
      ...options,
    };

    this.trainData = [];
    this.alreadyLoaded = 0;

    this.loadImagesNames();
  }

  loadImagesNames() {
    let data = fs.readdirSync(this.path, (err, files) => files);

    const { trainSize, shuffle, shufflePhrase, extentionsRegExp } = this.options;

    data = data.filter(el => extentionsRegExp.test(el));

    if (data.length < trainSize) {
      throw new Error('TrainSize too big. Check if there is avaible enought images in directory');
    }

    if (shuffle) {
      data = shuffleSeed.shuffle(data, shufflePhrase);
    }

    this.trainData = data;
  }

  async loadLabelAndImage() {
    if (this.trainData.length < 1) {
      throw new Error('There is no more images to load.');
    }

    const { labelRegExp } = this.options;

    const singleImage = this.trainData.shift();
    this.alreadyLoaded += 1;

    const label = labelRegExp.exec(singleImage)[0];
    const image = await loadImage(`${this.path}/${singleImage}`);

    const newCanvas = createCanvas(image.width, image.height);
    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    this.logs(`Loaded ${label}`);
    return { label, image: newCanvas };
  }

  async loadBatchSizeImages() {
    const labels = [];
    const images = [];

    const { batchSize, trainSize } = this.options;

    for (let i = 0; i < batchSize; i += 1) {
      const { label, image } = await this.loadLabelAndImage();
      labels.push(this.labels[label]);
      images.push(image);
    }

    this.logs(`Loaded already ${(this.alreadyLoaded / trainSize) * 100}%`);
    return { labels, images };
  }

  logs(text) {
    const { silentMode } = this.options;

    if (!silentMode) {
      console.log(text);
    }
  }
}
