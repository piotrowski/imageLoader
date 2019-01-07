import LoadImages from '../src/index';

test('throw error. Too less images', () => {
  const imageLoader = () =>
    new LoadImages('./__tests__/test-img', { test: [1] }, { batchSize: 1, trainSize: 1000 });
  expect(imageLoader).toThrow(Error);
});

test('Loaded image.', async () => {
  const imageLoader = new LoadImages(
    './__tests__/test-img',
    { test: [1] },
    { batchSize: 1, trainSize: 1 },
  );
  const loadedImage = await imageLoader.loadLabelAndImage();
  expect(loadedImage.label).toBe('test');
});

test('throw error. No more images', async () => {
  const imageLoader = new LoadImages(
    './__tests__/test-img',
    { test: [1] },
    { batchSize: 1, trainSize: 1 },
  );

  try {
    await imageLoader.loadLabelAndImage();
    await imageLoader.loadLabelAndImage();
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});

test('Loaded batch of images.', async () => {
  const imageLoader = new LoadImages(
    './__tests__/test-img',
    { test: [1, 0], tset: [0, 1] },
    { batchSize: 2, trainSize: 2 },
  );
  const loadedImages = await imageLoader.loadBatchSizeImages();

  expect(loadedImages).toBeInstanceOf(Object);
  expect(loadedImages).toHaveProperty('labels');
  expect(loadedImages.images).toBeInstanceOf(Array);
  expect(loadedImages.images[1]).not.toBeUndefined();
});

test('Thorw error - Loaded batch of images twice .', async () => {
  const imageLoader = new LoadImages(
    './__tests__/test-img',
    { test: [1, 0], tset: [0, 1] },
    { batchSize: 2, trainSize: 2 },
  );

  try {
    await imageLoader.loadBatchSizeImages();
    await imageLoader.loadBatchSizeImages();
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});
