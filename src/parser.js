
const babelParser = require('@babel/parser');

module.exports.parse = (code) => {
    return babelParser.parse(code, {
        sourceType: 'module',
    });
};
