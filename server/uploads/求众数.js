/**
 * 求众数
 * @param {Number []} nums 
 */

function majorityElement(nums){
    // nums.sort((a,b)=>a-b);

    // return nums[Math.floor(nums.length/2)];
    let count = 0;
    let res = nums[0];
    for (let n of nums) {
        if (res === n) {
            count++;
        } else {
            count--;
            if (count === 0) {
                res = n;
                count = 1;
            }
        }
    }
    return res;
}
console.log(majorityElement([2,2,1,1,1,2,2]));