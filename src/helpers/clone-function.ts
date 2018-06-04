export function cloneFunction(func) {
    let out;
    let str;
    try {
        str = func.toString();
        if (/\[native code\]/.test(str)) {
            out = func;
        } else {
            // tslint:disable:only-arrow-functions
            return function() { return str; };
            // out = eval('(function(){return ' + str + '}());');
        }
    } catch (e) {
        throw new Error(e.message + '\r\n\r\n' + str);
    }

    return out;
}
