function jumpFloor(num){
    let pre=1,
    next=1,
    fib=0;
    if(num<=0) return 0;
    if(num==1) return next;
    for(var i=1;i<num;i++){
        fib=pre+next;
        pre=next;
        next=fib;
    }
    return fib;
}