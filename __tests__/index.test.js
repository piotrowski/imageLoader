import LoadImages from '../index';

test('throw error. Too less images', () => {
  const imageLoader = () =>
    new LoadImages('./__tests__', { test: [1] }, { batchSize: 1, trainSize: 1000 });
  expect(imageLoader).toThrow(Error);
});

test('Loaded image.', async () => {
  const imageLoader = new LoadImages('./__tests__', { test: [1] }, { batchSize: 1, trainSize: 1 });
  const loadedImage = await imageLoader.loadLabelAndImage();
  expect(loadedImage.label).toBe('test');
});

test('throw error. No more images', async () => {
  const imageLoader = new LoadImages('./__tests__', { test: [1] }, { batchSize: 1, trainSize: 1 });

  try {
    await imageLoader.loadLabelAndImage();
    await imageLoader.loadLabelAndImage();
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});
