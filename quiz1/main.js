let A = document.querySelector("#A");
let B = document.querySelector("#B");
let C = document.querySelector("#C");
let answer = document.querySelector("#answer");
let btn_compute = document.querySelector("#compute");

btn_compute.onclick = function (){
    answer.value = parseInt(A.value) + parseInt(B.value) - parseInt(C.value);
}

// A.onchange = compute;
// B.onchange = compute;
// C.onchange = compute;

// function compute(){
//     answer.value = parseInt(A.value) + parseInt(B.value) - parseInt(C.value);
// }