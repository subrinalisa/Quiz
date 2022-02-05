import Question from "./Question.js";
import Quiz from "./Quiz.js";
const quesArray = [
    new Question('Which is not a css library?', ['Bootstrap', 'Tailwind', 'Vue', 'None'], 2),
    new Question('Which one is not a truthy value', ['0', 'true', '1', 'value'], 0),
    new Question('Which one is not a pillar of OOP?', ['Abstraction', 'Polymorphism', 'Inheritance', 'Chaining'], 3),
    new Question('Factory function returns-', ['Object', 'Class', 'Nodelist', 'Array'], 0),
    new Question(`In strict mode 'this' refers to`, ['Owner object', 'Global object', 'Element', 'Undefined'], 3)
];
const myQuiz = new Quiz(quesArray);
// Dom Elements
const quizQuestion = document.querySelector('.quiz-wrapper h1');
const quizChoices = document.querySelector('.quiz-choices');
const quesCount = document.querySelector('.question-count');
const quizScore = document.querySelector('.quiz-wrapper p');
const progressBar = document.querySelector('.progress-bar');
const nextBtn = document.querySelector('#next-button');
const prevBtn = document.querySelector('#previous-button');
const restartBtn = document.querySelector('#restart-button');
const timerElement = document.querySelector('.time-out');
let targetTime = 15 * 60;

setInterval((e) => {
    const minute = Math.floor(targetTime / 60);
    const seconds = targetTime % 60;
    timerElement.innerText = `${minute}:${seconds}`;
    targetTime--;
}, 1000);

function renderQuestion() {
    if (myQuiz.quizEnd()) {
        finishQuiz();
    } else {
        const singleQuestion = myQuiz.getCurrQues().question;
        setElement(quizQuestion, singleQuestion);
        let markup = "";
        const multipleChoices = myQuiz.getCurrQues().choices;
        multipleChoices.forEach((element, index) => {
            markup += `
            <div class="col-md-6 mb-2">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="option" data-order="${index}">${element}
                    </label>
                </div>
            </div>
            `
        });
        setElement(quizChoices, markup);
        setElement(quesCount, `${myQuiz.currIndex+1}/${quesArray.length}`);
    }
}

function progressStatus() {
    const progressWidth = (myQuiz.currIndex / quesArray.length) * 100;
    progressBar.style.width = progressWidth + '%';
}

function finishQuiz() {
    displayElement(restartBtn, 'block');
    displayElement(nextBtn, 'none');
    displayElement(prevBtn, 'none');
    displayElement(quizChoices, 'none');
    setElement(quizQuestion, `Congratulation!`);
    setElement(quizScore, `You've score ${myQuiz.score}`);
}

function setElement(element, value) {
    element.innerHTML = value;
}

function displayElement(element, value) {
    element.style.display = value;
}
// Next Button
nextBtn.addEventListener('click', function (e) {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    if (selectedOption) {
        const userChoice = selectedOption.getAttribute('data-order');
        myQuiz.increaseScore(userChoice);
        renderQuestion();
        progressStatus();
    } else {
        alert('Please select an option');
    }
});
// Previous Button
prevBtn.addEventListener('click', function (e) {
    myQuiz.prevIndex();
    renderQuestion();
    progressStatus();
});
// Restart Button
restartBtn.addEventListener('click', function (e) {
    myQuiz.reset();
    progressStatus();
    renderQuestion();
    displayElement(restartBtn, 'none');
    displayElement(nextBtn, 'block');
    displayElement(prevBtn, 'block');
    displayElement(quizChoices, 'flex');
    setElement(quizScore, `Pick an option below!`);
});
// Function invoke
renderQuestion();