import {Quiz} from "./Quiz.js";
import {arrayIteratorCreator} from "../../util/iterators.js";
import {StartState} from "./QuizManagerStates.js";

function getTemplate() {
    return `<div>
                <div class="quiz"></div>
                <div class="navigation">
                    <div id="nav-button" class="navigation__button button"></div>
                </div>
            </div>`
}

export class QuizManager {
    constructor(selector, data = []) {
        this.$el = document.querySelector(selector);
        this.quizIterator = arrayIteratorCreator(data);
        this._render();
        this.setState(new StartState(this));
    }

    setState(state) {
        if(this.state) this._remove();
        this.state = state;
        this._setup();
    }

    start() {
        const quiz = this.quizIterator.getItem();
        this.quiz = new Quiz('.quiz', quiz.item);
        return quiz.isEnded
    }

    end() {
        this.quiz.destroy();
    }

    getManagerButton() {
        return this.$el.querySelector('#nav-button')
    }

    getInfoAfterNextQuestion() {
        const quiz = this.quizIterator.getItem();
        this.quiz.setData(quiz.item);
        return quiz.isEnded
    }

    resetIterator() {
        this.quizIterator.reset();
    }

    _render() {
        this.$el.innerHTML = getTemplate();
    }


    _setup() {
        this.$el.querySelector('#nav-button').addEventListener('click', this.state.clickHandler );
    }

    _remove() {
        this.$el.querySelector('#nav-button').removeEventListener('click', this.state.clickHandler);
    }

}