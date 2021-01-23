export class StartState {
    constructor(context) {
        this.context = context;
        this.clickHandler = this._click.bind(this);
        this._apply(context.getManagerButton());
    }

    _apply(button) {
        button.innerText = 'Start';
    }

    _click() {
        this.context.start() ?
            this.context.setState(new EndedState(this.context)) :
            this.context.setState(new QuizState(this.context));
    }
}

export class QuizState {
    constructor(context) {
        this.context = context;
        this.clickHandler = this._click.bind(this);
        this._apply(context.getManagerButton());
    }

    _apply(button) {
        button.innerText = 'Next';
    }

    _click() {
        if(this.context.getInfoAfterNextQuestion())  this.context.setState(new EndedState(this.context))
    }
}

export class EndedState {
    constructor(context) {
        this.context = context;
        this.clickHandler = this._click.bind(this);
        this._apply(context.getManagerButton());
    }

    _apply(button) {
        button.innerText = 'End';
    }

    _click() {
        this.context.end();
        this.context.resetIterator();
        this.context.setState(new StartState(this.context));

    }
}