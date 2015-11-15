# rasterizeElement.js
Expands the functionality of [rasterizeHTML.js](https://github.com/cchandurkar/rasterizeElement.js/blob/master) to rasterize the contents of specified element. It supports everything that is supported by `rasterizeHTML.js`. 

### Install:
`$ npm install rasterizeelement` <br /><br />
Then use it via `require('rasterizeelement')` or use browserify builds from `dist/rasterizeElement.js` or `dist/rasterizeElement.min.js` in `<script/>` tag.

### Example:
```javascript
rasterizeElement.rasterize('#my-content', options, function(imgBase64){
  var img = document.createElement('img');
  img.src = imgBase64;
  document.appendChild(img);
});
```
### Options:

Option | type | Default | Description
--- | --- | --- | ---
encoding | string |'png' | Lets you choose the encoding of image such as 'png', 'jpg' or 'jpeg'.
quality | number| 1.0 | Should be between 0 to 1. 0 being lowest quality and 1 being the highest possible quality.
shouldClone | boolean | false | Clones the document before rasterizing. Use this when you want to capture dynamic content that changes often.
canvasFillStyle | string | '#FFFFFF' | Default background color of rasterized image. 

```javascript
var options = {
  encoding: 'png',
  quality: 1.0.
  shouldClone: false,
  canvasFillStyle: '#FFFFFF'
}
```

### How it works?
The drill here is pretty simple. An entire document is rasterized on temporary canvas using `rasterizeHTML`. Temporary canvas is then resized using specified element's height, width, left offset and top offset and converted into base64 encoding.

### Development:
1. clone this repository
2. cd into `rasterizeElement.js`
2. run `npm install`
3. run `grunt build` to manually build files in dist **OR** run `grunt watch` to auto build files as files in src changes 


 
