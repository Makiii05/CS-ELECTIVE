var submit_btn = document.querySelector("#submit_btn");
var score_con = document.querySelector("#score_con");

submit_btn.onclick = function(){
    score = 0;
    for (let i = 1; i <= 5; i++) {
        var question = document.querySelector("#q"+i);
        var correct = question.getAttribute("answer");
        var result = document.querySelector("#res"+i);
        var answer = question.value;
        
        if (correct.trim().toUpperCase() == answer.trim().toUpperCase()) {
            score += 1;
            result.innerHTML = "✅ answer is correct.";
        }else{
            result.innerHTML = "❌ answer is " + correct;
        }
    }
    var percentage = (score/5)*100;
    score_con.innerHTML = score + "/5 | " + percentage+"%"; 
}