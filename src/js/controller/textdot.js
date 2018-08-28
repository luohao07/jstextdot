var textsize = require('../utils/textsize.js')

function createCanvas(text, fontSize, fontName) {
    var textSize= textsize.textBitSize(text);
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', textSize * fontSize / 2 + "px");
    canvas.setAttribute('height', fontSize + "px");
    
    return canvas;
}

function drawText(text, fontSize, fontName, canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.font = fontSize + "px " + fontName;
    ctx.fillText(text, 0, fontSize * 0.75);
}

function defaultRgbCharMap(r, g, b, a, x, y) {
    if(r > 0 || g > 0 || b > 0) {
        alert(1);
    }
    if((r + g + b)/3 >= 50){
        return 1;
    }
    return 0;
}

module.exports = {
    getTextDot: function(text, options) {
        options = options | {};
        var fontName = options.fontName == undefined ? "宋体" : options.fontName;
        var fontSize = options.fontSize == undefined ? 30 : options.fontSize;
        var rgbCharMap = options.rgbCharMap == undefined ? defaultRgbCharMap : options.rgbCharMap;
        var realFontSize = fontSize / 72 * 96;
        var canvas = createCanvas(text, realFontSize, fontName);
        drawText(text, realFontSize, fontName, canvas);
        return this.getImageDot(canvas, rgbCharMap);
    },
    
    getImageDot: function(canvas, rgbCharMap) {
        var ctx = canvas.getContext("2d");
        var rgbaArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        var result = [];
        
        for (var x  = 0; x < canvas.height; x++) {
            result[x] = [];
            for(var y = 0; y < canvas.width; y++) {
                var startPosition = (x * canvas.width + y) * 4;
                result[x][y] = rgbCharMap(rgbaArr[startPosition], rgbaArr[startPosition + 1], rgbaArr[startPosition + 2], rgbaArr[startPosition + 3], x, y);
            }
        }
        return result;
    }
}