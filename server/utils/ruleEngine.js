class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

function isOperator(token) {
  return ["AND", "OR"].includes(token);
}

function tokenize(ruleString) {
  const regex = /\s*([()])\s*|\s*(AND|OR)\s*|\s*([^()ANDOR\s]+)\s*|\s*(['"][^'"]*['"])\s*/g;
  const tokens = [];
  let match;
  while ((match = regex.exec(ruleString)) !== null) {
    if (match[1]) {
      tokens.push(match[1]);
    } else if (match[2]) {
      tokens.push(match[2]);
    } else if (match[3]) {
      tokens.push(match[3]);
    } else if (match[4]) {
      tokens.push(match[4].replace(/'/g, "").replace(/"/g, ""));
    }
  }
  return tokens;
}

function parse(tokens) {
  function parseExpression() {
    let left = parseTerm();
    
    while (tokens.length && isOperator(tokens[0])) {
      const operator = tokens.shift();
      const right = parseTerm();
      left = new Node(operator, left, right);
    }

    return left;
  }

  function parseTerm() {
    let token = tokens.shift();

    if (token === '(') {
      const expr = parseExpression();
      if (tokens.shift() !== ')') {
        throw new Error("Missing closing parenthesis");
      }
      return expr;
    }

    if (isOperator(token)) {
      throw new Error("Unexpected operator at the start");
    }

    // Handle operand format
    const attribute = token;
    const operator = tokens.shift();
    const value = tokens.shift();

    if (!operator || !value) {
      throw new Error("Invalid operand format");
    }

    return new Node('operand', null, null, { attribute, operator, value });
  }

  return parseExpression();
}

function createRule(ruleString) {
  const tokens = tokenize(ruleString);
  console.log("Tokens:", tokens); // Debugging line to check tokens
  return parse(tokens);
}

function combineRules(rules) {
  console.log(rules);
  if (rules.length === 0) {
    throw new Error("No rules to combine");
  }

  const ruleASTs = rules.map(ruleString => parse(tokenize(ruleString)));

  function combineASTs(astList, connector) {
    if (astList.length === 1) {
      return astList[0];
    }

    const combinedAST = astList.reduce((acc, currentAST) => {
      return new Node(connector, acc, currentAST);
    });

    return combinedAST;
  }

  // Combine all rule ASTs using AND connector (you can modify to use different strategies)
  return combineASTs(ruleASTs, 'AND');
}


function evaluateRule(ast, data) {
    console.log("Evaluating node:", JSON.stringify(ast));
    if (ast.type === 'operand') {
        const { attribute, operator, value } = ast.value;
        const dataValue = data[attribute];
        console.log(`Comparing: dataValue=${dataValue}, operator=${operator}, value=${value}`);
        switch (operator) {
            case '>':
                return dataValue > parseFloat(value);
            case '<':
                return dataValue < parseFloat(value);
            case '>=':
                return dataValue >= parseFloat(value);
            case '<=':
                return dataValue <= parseFloat(value);
            case '==':
                return dataValue == value.replace(/['"]/g, '');
            case '!=':
                return dataValue != value.replace(/['"]/g, '');
            case '=': // Handling single equals sign for string comparison
                return dataValue === value.replace(/['"]/g, '');
            default:
                throw new Error('Invalid operator');
        }
    } else if (ast.type === 'AND') {
        return evaluateRule(ast.left, data) && evaluateRule(ast.right, data);
    } else if (ast.type === 'OR') {
        return evaluateRule(ast.left, data) || evaluateRule(ast.right, data);
    } else {
        throw new Error('Invalid node type');
    }
}




module.exports = { createRule, combineRules, evaluateRule };
