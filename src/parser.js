function parser(tokens) {

    // Again we keep a `current` variable that we will use as a cursor.
    let current = 0;
  
    function walk() {
  
      let token = tokens[current];
  
      if (token.type === 'number') {
  
        // If we have one, we'll increment `current`.
        current++;
  
        // And we'll return a new AST node called `NumberLiteral` and setting its
        // value to the value of our token.
        return {
          type: 'NumberLiteral',
          value: token.value,
        };
      }
  
      if (
        token.type === 'paren' &&
        token.value === '('
      ) {
  
        let node = {
          type: 'Bracket',
          params: [],
        };
  
        // We increment `current` *again* to skip the name token.
        token = tokens[++current];
  
        while (
          (token.type !== 'paren') ||
          (token.type === 'paren' && token.value !== ')')
        ) {
          node.params.push(walk());
          token = tokens[current];
        }
  
        current++;
  
        return node;
      }

      if (token.type === 'operator') {
  
        current++;

        return {
          type: 'Operator',
          value: token.value,
        };
      }
  
      throw new TypeError(token.type);
    }
  
    let ast = {
      type: 'Program',
      body: [],
    };
  
    while (current < tokens.length) {
      ast.body.push(walk());
    }
  
    return ast;
  }