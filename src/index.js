
var rasterizeHTML = require('rasterizehtml');

module.exports = (function(rasterizeHTML){
  return {

    rasterize: function(element, options, callback){

      // Check if rasterizeHTML is not found
      if(!rasterizeHTML || rasterizeHTML === 'undefined'){
        callback(null);
        return;
      }

      // Check if valid selector is provided
      if(!document.querySelector(element)){
        callback(null);
        return;
      }

      // Default Settings
      var encoding = options && options.hasOwnProperty('encoding') ?  options.encoding : 'png';
      var quality = options && options.hasOwnProperty('quality') ?  options.quality : 1.0;
      var canvasFillStyle = options && options.hasOwnProperty('canvasFillStyle') ? options.canvasFillStyle : '#FFFFFF';
      var shouldClone = options && options.hasOwnProperty('shouldClone') ? options.shouldClone : false ;

      // Check if document should be cloned
      var doc = shouldClone ? document.cloneNode(true) : document;

      // Get Body and HTML
      var body = doc.body;
      var html = doc.documentElement;

      // Compute Max Height - entire document height
      var maxHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

      // Compute Max Width - entire document width
      var maxWidth = Math.max(body.scrollWidth, body.offsetWidth,
      html.clientWidth, html.scrollWidth, html.offsetWidth);

      // Create temporary canvas element
      var canvas = doc.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = maxHeight;

      // Modify Context of Canvas
      var context = canvas.getContext("2d");
      context.fillStyle = canvasFillStyle;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Get DOM element of selector
      var elementDOM = doc.querySelector(element);

      // Size and Offsets to crop the document
      var height = Math.max(elementDOM.clientHeight, elementDOM.scrollHeight);
      var width = Math.max(elementDOM.clientWidth, elementDOM.scrollWidth);
      var topOffset = elementDOM.offsetTop;
      var leftOffset = elementDOM.offsetLeft;

      // Rasterize entire document
      rasterizeHTML.drawDocument(doc, canvas).then(function(renderResult) {

        // Get Image Data
        var imageData = canvas.getContext("2d")
          .getImageData(leftOffset, topOffset, width, height);

        // Resize
        canvas.width = width;
        canvas.height = height;

        // Put cropped data back
        canvas.getContext("2d").putImageData(imageData, 0, 0);

        // Get base64
        var imageBase64 = canvas.toDataURL("image/"+encoding, quality);

        // Send result back
        callback(imageBase64);

      });

    }

  };

}(rasterizeHTML));
