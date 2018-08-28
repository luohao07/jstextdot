require("../css/index.css");
textdot = require("./controller/textdot.js");

var textDotArr = textdot.getTextDot("text");
document.write(textDotArr);