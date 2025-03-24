const questions =[
    {
        question: "Which is the correct way to declare a JavaScript variable?",
        answers: [
            { text: "variable name", correct:false},
            { text: "var name", correct:true},
            { text: "v name", correct:false},
            { text: "declare name", correct:false},
        ]
    },
    {
      
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { text: "Number", correct:false},
            { text: "String", correct:false},
            { text: "Character", correct:true},
            { text: "Boolean", correct:false},
        ]
    },
    {
      
        question: "How do you write a comment in JavaScript?",
        answers: [
            { text: "# This is a comment", correct:false},
            { text: "// This is a comment //", correct:true},
            { text: "<!-- This is a comment -->", correct:false},
            { text: "/* This is a comment */", correct:false},
        ]
    },
    {
      
        question: "What will typeof null return in JavaScript?",
        answers: [
            { text: "null", correct:false},
            { text: "object", correct:true},
            { text: "undefined", correct:false},
            { text: "string", correct:false},
        ]
    },
    {
      
        question: "Which function is used to convert string to an integer?",
        answers: [
            { text: "parseInt()", correct:true},
            { text: "toInteger()", correct:false},
            { text: "StringToInt()", correct:false},
            { text: "convertInt()", correct:false},
        ]
    },
   
]

const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    })
nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
 startQuiz();