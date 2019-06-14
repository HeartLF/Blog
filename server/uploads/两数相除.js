function divide(dividend,divisor){
    if (dividend == 0) {
        return 0;
    }
    
    if (dividend == Number.MIN_VALUE && divisor == -1) {
        return Number.MAX_VALUE;
    }
    
    var isPositive = true;
    if (dividend > 0 && divisor < 0 || (dividend < 0 && divisor > 0)) {
        isPositive = false;
    }
    
    var a = Math.abs(dividend);
    var b = Math.abs(divisor);
    var shift = 0;
    var result = 0;
    
    while (a >= b) {
        while (a >= b << shift) {
            shift++;
        }
        a -= b << (shift - 1);
        result += 1 << (shift - 1);
        shift = 0;
    }
    return isPositive ? result : -result;
}
console.log(divide(-2147483648,-1));