/**
 * 
 * @param {number[]} nums1 
 * @param {number} m 
 * @param {number []} nums2 
 * @param {number} n 
 */

function merge(nums1,m,nums2,n){
   nums1.splice(m);
   nums2.splice(n);
   for(var i=0;i<nums2.length;i++)
    nums1.push(nums2[i]);
   nums1.sort((a,b)=>a-b);
   console.log(nums1);
}
merge([1,2,3,0,0,0],3,[2,5,6],3);