function compute(program) {
  let nodes = program.body
  let result = ''
  if(Array.isArray(nodes)){
    return removeBrackets(nodes)
  }
  return result
}

// 去掉括弧
function removeBrackets(nodes){
  nodes = nodes.map(node => {
    switch (node.type) {
      case "Bracket":
        // 平铺括号内的各节点
        return {
          type:"NumberLiteral",
          value:removeBrackets(node.params)
        }
      default:
        return node
    }
  });
  return separateNodes(nodes)
}

// 把乘除和加减区分出来
function separateNodes(nodes){
  let result = ''
  // 计算乘除
  let start = -1
  for(let i = 0;i<nodes.length;i++){
    let item = nodes[i]
    switch (item.value) {
      case '×':
      case '÷':
        if(start === -1){
          start = i-1
        }
        
        break;
      default:
        if(start !== -1){
          let end
          let isAddAndDelOperator = ['+','-'].includes(nodes[i].value)
          let isLastNode = i === nodes.length-1

          if(isAddAndDelOperator || isLastNode){
            if(isAddAndDelOperator){
              end = i
            }

            if(isLastNode){
              end = i+1
            }

            nodes.splice(start,end-start,{
              type:'NumberLiteral',
              value:equalPriorityCompute(nodes.slice(start,end))
            })

            i = start
            start = -1
          }
        }
        break;
    }
  }
  
  // 计算加减
  result = equalPriorityCompute(nodes)
  return result
}

// 计算同等优先级数组序列(乘除、加减)
function equalPriorityCompute(nodes){
  if(nodes[2]){
    let left = Number(nodes[0].value)
    let operator = nodes[1].value
    let right = Number(nodes[2].value)
    let result = ''
    switch (operator) {
      case '+':
        result = left+right
        break;
      case '-':
        result = left-right
        break;
      case '×':
        result = left*right
        break;
      case '÷':
        result = left/right
        break;
      default:
        break;
    }
    nodes.splice(0,3,{
      type:'NumberLiteral',
      value:result
    })
    return equalPriorityCompute(nodes)
  }
  return nodes[0].value
}