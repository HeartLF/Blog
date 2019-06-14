/**
 * 
 * @param {number []} nums 
 */
var plusOne = function(digits) {
    // var count = digits.length-1
    // var plusNum = digits[count] = digits[count] + 1
    // while(plusNum>=10){
    //     digits[count] = 0
    //     var count = count - 1
    //     if(count < 0){
    //         digits.unshift(1)
    //         break;
    //     }
    //     plusNum = digits[count] = digits[count] + 1
    // }
    // return digits

    let addFlag = true;
    
    for(let i = digits.length -1; i >= 0; i--) {
        // let num = digits[i];
        if(addFlag) {
            digits[i]++;
            if(digits[i] === 10) {
                digits[i] = 0;
                addFlag = true;
            }else {
                addFlag = false;
            }
        }
    }
    // if(addFlag){
    //     digits.unshift(1);
    // }
    return digits;
}; 
console.log(plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]));