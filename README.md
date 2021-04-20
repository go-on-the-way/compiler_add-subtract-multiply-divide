# compiler_add-subtract-multiply-divide
ast +-×÷，加减乘除编译器  
测试用例

```
    console.log(compute(parser(tokenizer('2+5-3×4')))) //-5
    console.log(compute(parser(tokenizer('2+5-3×4÷2')))) //1
    console.log(compute(parser(tokenizer('2+5-3×4÷2+(10-5×3)×(6-3)')))) //-14
    console.log(compute(parser(tokenizer('2+(5+3×(4÷2)+(10-5×3)×(6-3))')))) //-2
```