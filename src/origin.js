function compile (result) {
    let reg = /\([\d,\+,\-,×,÷]+\)/ //带括号的表达式匹配
    let multiplyAndDivide = /[\d,\.]+[×,÷][\d,\.]+/
    let addAndDel = /[\d,\.]+[\+,\-][\d,\.]+/
    let outterReg = reg
    while (!/^-?[\d,\.]+$/.test(result)) {
        let copyResult = result

        result = result.replace(outterReg, function (match) {
            let copy = match.replace(/[\(,\)]/g, '')
            while (!/^[\d,\+,\-,\.]+$/.test(copy)) {
                copy = copy.replace(multiplyAndDivide, function (match1) {
                    let operator = match1.replace(/[\d,\.]+/g, '')
                    if (operator === '×') {
                        let left = match1.split('×')[0]
                        let right = match1.split('×')[1]
                        return left * right
                    }

                    if (operator === '÷') {
                        let left = match1.split('÷')[0]
                        let right = match1.split('÷')[1]
                        return left / right
                    }
                })
            }

            while (!/^-?[\d,\.]+$/.test(copy)) {
                copy = copy.replace(addAndDel, function (match2) {
                    let operator = match2.replace(/[\d,\.]+/g, '')
                    if (operator === '+') {
                        let left = match2.split('+')[0]
                        let right = match2.split('+')[1]
                        return Number(left) + Number(right)
                    }

                    if (operator === '-') {
                        let left = match2.split('-')[0]
                        let right = match2.split('-')[1]
                        return Number(left) - Number(right)
                    }
                })
            }

            return copy
        })
        if (copyResult === result) {
            outterReg = /\d[\d,\+,\-,×,÷]+\d/
        }

    }
    return result
}