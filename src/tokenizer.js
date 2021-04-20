function tokenizer(input) {
    
    // A `current` variable for tracking our position in the code like a cursor.
    let current = 0;
  
    let tokens = [];
  
    while (current < input.length) {
  
      let char = input[current];
  
      if (char === '(') {
        tokens.push({
          type: 'paren',
          value: '(',
        });
  
        current++;
        continue;
      }
  
      if (char === ')') {
        tokens.push({
          type: 'paren',
          value: ')',
        });
        current++;
        continue;
      }

      let WHITESPACE = /\s/;
      if (WHITESPACE.test(char)) {
        current++;
        continue;
      }
  
      let NUMBERS = /[0-9]/;
      if (NUMBERS.test(char)) {
        let value = '';
  
        while (NUMBERS.test(char)) {
          value += char;
          char = input[++current];
        }
  
        tokens.push({ type: 'number', value });
  
        continue;
      }
  
      let operators = /[+,\-,×,÷]/i;
      if (operators.test(char)) {
        tokens.push({ type: 'operator', value:char });
        current++;
        continue;
      }
  
      throw new TypeError('I dont know what this character is: ' + char);
    }
  
    return tokens;
}