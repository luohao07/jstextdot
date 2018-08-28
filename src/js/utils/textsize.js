module.exports = {
    textBitSize: function(text) {
        var size = 0;
        for(var i = 0; i < text.length; i++) {
            size += text.charCodeAt(i) <= 127 ? 1 : 2;
        }
        return size;
    }
}