class Question {
    constructor(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
    checkCorrect(userChoice) {
        return this.answer == userChoice;
    }
}
export default Question;