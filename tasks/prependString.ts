import through2 = require("through2");

export const prependString = function generatePrependString(content: string) {
    return through2.obj(function prependString(file, _, cb) {
        if (file.isBuffer()) {
            file.contents = Buffer.from(`${content}${file.contents.toString()}`);
        }

        cb(null, file);
    });
}