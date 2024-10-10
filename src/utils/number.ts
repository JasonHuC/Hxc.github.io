import {toNumber} from "lodash-es";

// 返回一个保留一位小数的字符串
const formatDecimal = (n:number) => {
    let num = n.toString();
    const index = num.indexOf('.');
    if(index !== -1){//num是小数
        num = num.substring(0, 1 + index +1);//使用 substring 方法从 num 的开头截取到小数点后的一位。这里 1 + index + 1 确保取到小数点后的第一位数字。
    }else {
        num = num.substring(0);
    }
    return parseFloat(num).toFixed(1);//使用 parseFloat 将 num 转换回浮点数，并使用 toFixed(1) 方法格式化为一位小数的字符串形式。
}
export const formatNum = (n?: number | string | null) => {
    if(!n){
        return '0';
    }
    const num  = toNumber(n);
    if(num < 10 ** 3){
        return `${num}`;
    }else if(num >= 10 ** 3 && num < 10 ** 6){
        return `${formatDecimal(num / 10 **3)}k`;
    }else if(num >= 10 ** 6 && num < 10 ** 9){
        return `${formatDecimal(num / 10 ** 6)}m`;
    }else if (num >= 10 ** 9){
        return `${formatDecimal(num / 10 ** 9)}b`;
    }
}