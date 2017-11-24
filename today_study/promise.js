function fun1() {
    var p=new Promise(function (res,rej) {
        setTimeout(function () {
            console.log("fun1")
            res(111)
        },2000)
    })
    return p
}
function fun2() {
    var p=new Promise(function (res,rej) {
        setTimeout(function () {
            console.log("fun2")
            res(222)
        },2000)
    })
    return p
}

// var p=new Promise(function (res,rej) {
//     setTimeout(function () {
//         console.log("func0")
//         res()
//     },200)
// })
// p.then(function () {
//     return fun1();
// }).then(function (data) {
//     return fun2()
// }).then(function () {
//     console.log("jisheu")
// })

Promise.all([fun1(),fun2()])
.then(function (result) {
    console.log(result);
})