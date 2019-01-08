# @apiotrowski312/image-loader

Load an image (or batch of images) and put them in Canvas for you. Pretty useful for machine learning with NodeJS and TensorFlow. Should work fine with any node thanks to `@babel/polyfil`.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install @apiotrowski312/image-loader --save
```

## Usage

This module assumes that you have all images in one directory. All of the images with the same naming convention (for creating labels).

#### Basic use
```javascript
import LoadImages from '../src/index';

const imageLoader = new LoadImages('./images', { one: 'first', two: 'second'}, {silent: true, batchSize: 10});
const loadOneImage = imageLoader.loadLabelAndImage();
const loadBatchOfImages = imageLoader.loadBatchSizeImages();
```

#### Detailed options
```javascript
new LoadImages(PATH, LABELS, OPTIONS);
```

- PATH - path as a string
- LABELS - Object, with key - value pairs. Each label should match your *labelRegExp* option.


For example, if you have a directory with images named like (and you didn't change `labelRegExp`):

`one.1.jpg, one.2.jpg, two.jpg, two.xxx.qqq.png`,

then your labels key should look similar to the following example. Values can be different, the following example would work well with TtensorFlowJS.
```javascript
const labels = {
  one: [1, 0],
  two: [0, 1],
}
```

- OPTIONS

|  KEY 	          |  DEFAULT 	                    |  DESCRIPTION    |
| :-:	            |  :-:	                        |  :-:	          |
| shuffle 	      | `true`  	                    | shuffle order of loading images if `true`  |
| shufflePhrase 	| `'phrase'` 	                  | shuffle phrase for `shuffle-seed`  |
| batchSize   	  | `10` 	                        | how many images do you want to load in one batch|
| trainSize   	  | `100` 	                      | how many images do you want to load to the script |
| labelRegExp   	| `RegExp(/[^.]*/)`  	          | regexp for matching labels from img filenames |
| extentionsRegExp| `RegExp(/\.(jpg|png|jpeg)$/)` | regexp for matching images extentions (any other extention won't be loaded) |
| silentMode   	  | `true` 	                      | if `true` then there will be no console.logs(). Usesful for debugging. |

## Tests

```sh
npm install
npm test
```

## Dependencies

- [@babel/polyfill](https://ghub.io/@babel/polyfill): Provides polyfills necessary for a full ES2015+ environment
- [canvas](https://ghub.io/canvas): Canvas graphics API backed by Cairo
- [package-json-to-readme](https://ghub.io/package-json-to-readme): Generate a README.md from package.json contents
- [shuffle-seed](https://ghub.io/shuffle-seed): Shuffle Array based on a Seed

## Dev Dependencies

- [@babel/cli](https://ghub.io/@babel/cli): Babel command line.
- [@babel/core](https://ghub.io/@babel/core): Babel compiler core.
- [@babel/node](https://ghub.io/@babel/node): Babel command line
- [@babel/preset-env](https://ghub.io/@babel/preset-env): A Babel preset for each environment.
- [babel-core](https://ghub.io/babel-core): A placeholder package that bridges babel-core to @babel/core.
- [eslint](https://ghub.io/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-airbnb](https://ghub.io/eslint-config-airbnb): Airbnb&#39;s ESLint config, following our styleguide
- [eslint-config-prettier](https://ghub.io/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-import](https://ghub.io/eslint-plugin-import): Import with sanity.
- [eslint-plugin-jsx-a11y](https://ghub.io/eslint-plugin-jsx-a11y): Static AST checker for accessibility rules on JSX elements.
- [eslint-plugin-prettier](https://ghub.io/eslint-plugin-prettier): Runs prettier as an eslint rule
- [eslint-plugin-react](https://ghub.io/eslint-plugin-react): React specific linting rules for ESLint
- [prettier](https://ghub.io/prettier): Prettier is an opinionated code formatter
- [jest](https://ghub.io/jest): Delightful JavaScript Testing.

## To Do

  - [ ] add JSDoc (or simmilar)
  - [ ] remove `trainSize` option
  - [ ] change throwing Errors to something else (maybe return undefined?)


## License

MIT
