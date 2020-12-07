const util = require('util');
async function a(){
    setTimeout(() => console.log('async a'), 0);
   // return 1;
}



async function b() {
    console.log(1);
    let aa =  a();
    console.log(aa);
    util.format(aa);
    console.log(2);
}

b();

// console.log(1);
// let aa =  a();
// console.log(aa);
// console.log(2);