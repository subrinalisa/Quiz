class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currIndex = 0;
    }
    getCurrQues() {
        return this.questions[this.currIndex];
    }
    nextIndex() {
        this.currIndex++;
    }
    prevIndex() {
        if (this.currIndex) {
            this.currIndex--;
        } else {
            alert('There is no previous question');
        }
    }
    increaseScore(userChoice) {
        const q = this.getCurrQues();
        if (q.checkCorrect(userChoice)) {
            ++this.score;
        }
        this.nextIndex();
    }
    reset() {
        this.score = 0;
        this.currIndex = 0;
    }
    quizEnd() {
        return this.currIndex == this.questions.length;
    }
}
export default Quiz;