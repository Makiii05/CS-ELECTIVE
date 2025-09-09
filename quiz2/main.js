var name1 = document.querySelector("#name1");
var name2 = document.querySelector("#name2");
var q11 = document.querySelector("#q11");
var q12 = document.querySelector("#q12");
var ave1 = document.querySelector("#ave1");
var q21 = document.querySelector("#q21");
var q22 = document.querySelector("#q22");
var ave2 = document.querySelector("#ave2");
var totalq1 = document.querySelector("#totalq1");
var totalq2 = document.querySelector("#totalq2");
var total_ave = document.querySelector("#total_ave");
var summary = document.querySelector("#summary");
highest()

name1.onchange = highest
name2.onchange = highest

q11.onchange = function() {
    compute_ave(q11.value, q12.value, ave1);
    total_quiz(q11.value, q21.value, totalq1)
    highest()
};
q12.onchange = function() {
    compute_ave(q11.value, q12.value, ave1)
    total_quiz(q12.value, q22.value, totalq2)
    highest()
};
q21.onchange = function() {
    compute_ave(q21.value, q22.value, ave2);
    total_quiz(q11.value, q21.value, totalq1)
    highest()
};
q22.onchange = function() {
    compute_ave(q21.value, q22.value, ave2)
    total_quiz(q12.value, q22.value, totalq2)
    highest()
};


function compute_ave(quiz1, quiz2, average){
    average.value = (parseInt(quiz1) + parseInt(quiz2))/2;
}

function total_quiz(quizA, quizB, total){
    total.value = parseInt(quizA) + parseInt(quizB);
    total_ave.value = (parseFloat(ave1.value) + parseFloat(ave2.value));
}

function highest(){
    if (ave1.value > ave2.value) {
        summary.innerHTML = name1.value + " has the highest average of "+ave1.value;
    } else if (ave2.value < ave2.value) {
        summary.innerHTML = name2.value + " has the highest average of "+ave2.value; 
    } else {
        summary.innerHTML = name1.value+" and "+name2.value+"  has the highest average of "+ave1.value; 
    }
}