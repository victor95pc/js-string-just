var RE_UCHARS = /([\uD800-\uDBFF][\uDC00-\uDFFFF]|[\S\s])/g;

var codepoints = function(string: string): number {
    return string.replace(RE_UCHARS, '_').length;
};

var substring = function(string: string, length: number): string {
    return string.match(RE_UCHARS).slice(0, length).join('');
}

var just = function(append: boolean): Function {
    return function(string: any, length?: any, chars?: string): string {
        var str: string
            , len: number
            , chr: string
            , diff: number
            , fill: string = ''
            ;

        if (typeof this === 'string' || this instanceof String) {
            str = <string> this;
            len = <number> string;
            chr = <string> length;
        } else {
            str = <string> string;
            len = <number> length;
            chr = <string> chars ? chars : ' ';
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
};

interface String {
    ljust(length: number, chars?: string): string;
    rjust(length: number, chars?: string): string;
}

interface IJust {
    (): void;
    ljust: Function;
    rjust: Function;
}

var ljust = just(true);
var rjust = just(false);

var install = <IJust> function(): void {
    String.prototype['ljust'] = ljust;
    String.prototype['rjust'] = rjust;
};

install.ljust = ljust;
install.rjust = rjust;

export = install;
