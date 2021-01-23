function getTemplate(data) {
    return `<div class="quiz__wrap-question">
                    <div id="question" class="quiz__question"></div>
            </div>
            <div id="answers" class="quiz__wrap-answers">
            </div>
            <div class="quiz__wrap-true-answer">
                <div id="true-answer" class="quiz__true-answer"></div>
            </div>`
}

export class Quiz {
    constructor(selector, data = '') {
        this.$el = document.querySelector(selector);
        this._render();

        if(data) this.setData(data);
        this._setup();
    }

    _render() {
        this.$el.innerHTML = getTemplate(this.data);
    }

    _verifyData(data = '') {
        if(typeof data !== "object") throw new Error('Data must be object')

        if(!(data.question && data.question
            && typeof data.question === "string")) throw new Error('Data.questions is incorrect')

        if(!(data.answers && Array.isArray(data.answers) && data.answers.length > 0
            && data.answers.every(el => el.text !== '') ) ) throw new Error('Data.answers is incorrect')

        if(!(data.trueAnswer && data.answers.map(el => el.text).includes(data.trueAnswer))) throw new Error('Data/trueAnswer is incorrect')
    }

    _showTrueAnswer() {
        const $trueAnswer = this.$el.querySelector('#true-answer');
        $trueAnswer.style.display = 'block';
        $trueAnswer.innerText = this.data.trueAnswer;
    }

    _hideTrueAnswer() {
        const $trueAnswer = this.$el.querySelector('#true-answer');
        $trueAnswer.style.display = 'none';
    }

    _answersDisableManager(operation = '') {
        const operations = ['disable', 'active'];
        if(!operations.includes(operation)) throw new Error('Operation is not exist')

        const $answers = this.$el.querySelector('#answers').children;
        for(let i = 0; i < $answers.length; i++) {
            switch (operation) {
                case "disable": {
                    $answers[i].classList.add('disabled');
                    break;
                }
                case "active": {
                    $answers[i].classList.remove('disabled');
                    break;
                }
            }
        }
    }

    _clickOnAnswer(e) {
        const $answer = e.target;
        const answerText = $answer.dataset.text;
        if(answerText) {
            this._answersDisableManager('disable');
            this._showTrueAnswer();

            answerText === this.data.trueAnswer ?
                $answer.classList.add('correct') :
                $answer.classList.add('wrong')
        }
    }

    _setup() {
        this.$el.querySelector('#answers')
            .addEventListener('click', this._clickOnAnswer.bind(this) )
    }

    setData(data) {
        this._verifyData(data);
        this.data = data;
        this._hideTrueAnswer();

        this.$el.querySelector('#question').innerText = data.question + '?';
        this.$el.querySelector('#answers').innerHTML = data.answers
            .map(el => `<div class="quiz__answer button" data-text="${el.text}">${el.text}</div>`).join('');
        return this
    }

    destroy() {
        this.$el.querySelector('#answers')
            .removeEventListener('click', this._clickOnAnswer.bind(this) );
        this.$el.innerHTML = '';
    }
}

