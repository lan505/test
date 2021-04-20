/**
 * 格式化数字，把数字向上取整，按照数字的单位向上一位取整
 * 例如：
 *  185  => 200
 *  1858 => 2000
 *  9858 => 10000
 *  180  => 200
 *  2000 => 2000
 *  9001 => 10000
 * @param {*} num 
 * @returns 
 */
function format(num) {
    let numStr = num.toString();
    let regExp = new RegExp("(?<=.{1}).", 'g');
    let result = numStr.replace(regExp, '0');
    
    if(result === numStr){
        return num;
    }else{
        var first = parseInt(result.charAt(0)) + 1;
        return parseInt(first + result.substring(1, result.length));
    }
    
}

export { format }
