
const file = "test.js"
const output = "output.gera"
const { parse } = require("./parser");
const { generator } = require("./generator");
const fs = require('fs');

const main = () => {
    console.log(parse)
    const code = fs.readFileSync(file, 'utf-8');
    const ast = parse(code);
    const result = generator(ast);
    fs.writeFileSync(output, result);
}

main()
