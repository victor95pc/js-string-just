var RE_UCHARS = /([\uD800-\uDBFF][\uDC00-\uDFFFF]|[\S\s])/g;
var codepoints = function (string) {
    return string.replace(RE_UCHARS, '_').length;
};
var substring = function (string, length) {
    return string.match(RE_UCHARS).slice(0, length).join('');
};
var just = function (append) {
    return function (string, length, chars) {
        if (string) {
            var str, len, chr, diff, fill = '';
            if (typeof this === 'string' || this instanceof String) {
                str = this;
                len = string;
                chr = length ? length : ' ';
            }
            else {
                str = string;
                len = length;
                chr = chars ? chars : ' ';
            }
            diff = len - codepoints(str);
            if (diff <= 0) {
                return str;
            }
            do {
                fill += chr;
            } while (diff > codepoints(fill));
            fill = substring(fill, diff);
            return append ? str + fill : fill + str;
        }
        else {
          return "";
        }
    };
};
var ljust = just(true);
var rjust = just(false);
module.exports = { ljust: ljust, rjust: rjust };
