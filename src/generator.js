var result = '';

const generate = (ast) => {
    switch (ast.type) {
        case 'Program':
            ast.body.forEach(element => {
                generate(element)
            });
            break;
        case 'ExpressionStatement':
            generate(ast.expression)
            result += ';'
            break;
        case 'CallExpression':
            if (ast.callee.type === 'MemberExpression') {
                // in gera, we can use the pipe operator to call methods
                // on objects, like this:
                //
                // myObject |> myMethod
                //
                // which is equivalent to:
                //
                // myObject.myMethod()
                
                // first, we generate the object
                generate(ast.callee.object)
                // then, we generate the method name
                result += ` |> ${ast.callee.property.name}`;
            } else {
                generate(ast.callee)
            }
            result += '('
            ast.arguments.forEach((element, index) => {
                generate(element)
                if (index < ast.arguments.length - 1) {
                    result += ','
                }
            });
            result += ')'
            break;
        case 'Identifier':
            result += ast.name
            break;
        case 'NumberLiteral':
            result += ast.value
            break;
        case 'StringLiteral':
            result += `"${ast.value}"`
            break;
        case 'VariableDeclaration':
            result += 'var '
            generate(ast.declarations[0])
            result += ';'
            break;
        case 'VariableDeclarator':
            generate(ast.id)
            result += '='
            generate(ast.init)
            break;
        case 'BinaryExpression':
            generate(ast.left)
            result += ast.operator
            generate(ast.right)
            break;
        
        default:
            throw new TypeError(ast.type)
    }
    return result;    
}

module.exports.generator = (ast) => {
    console.log(ast)
    console.log(ast.program.body)
    for (let i = 0; i < ast.program.body.length; i++) {
        console.log(ast.program.body[i])
        let node = ast.program.body[i]
        generate(node);
    }
    return result;
}
