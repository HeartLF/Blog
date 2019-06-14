function addBinary(a, b) {
    // let i = a.length - 1,
    //     j = b.length - 1,
    //     sum = '',
    //     rev = 0;
    // while (a[i] || b[j]) {
    //     let x = a[i] ? a[i] : 0
    //     let y = b[j] ? b[j] : 0
    //     let diff = 2 - x - y - rev;
    //     if (diff < 1) {
    //         rev = 1;
    //         sum = (2 - diff) % 2 + sum;
    //     } else {
    //         rev = 0;
    //         sum = (2 - diff) + sum;
    //     }
    //     i--;
    //     j--;
    // }
    // if (rev) {
    //     sum = 1 + sum;
    // }
    // return sum;

    let i = a.length - 1,
        j = b.length - 1;
    let s = '';
    target = '0';
    while (i >= 0 || j >= 0) {
        let ca = i >= 0 ? a[i] : "0";
        let cb = j >= 0 ? b[j] : "0";
        if (ca === '0' && cb === '0') {
            s = tag + s;
            tag = "0";
        } else if (ca === '1' && cb === '1') {
            s = tag + s;
            tag = "1";
        } else if ((ca === '1' || cb === '1') && tag === "1") {
            s = "0" + s;
        } else {
            s = "1" + s;
        }
        --i;
        --j;
    }
    return tag === "1" ? "1" + s : s;

    a = a.split(''),b = b.split('')
    
    let res = ''

    let rem = 0

    while(a.length || b.length || rem){

        let sum = (parseInt(a.pop()) || 0) + parseInt((b.pop()) || 0) + rem
        rem = Math.floor(sum/2);
        res = String(sum%2) + res;
    }
    return res;
}
addBinary("1010","1011")