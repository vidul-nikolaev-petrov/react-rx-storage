import React from 'react';
import s$ from '../../indexES5';

export class StepOne extends React.Component {
    // basic storage functionaity
    constructor(props) {
        super(props);
        this.state = { stepOne: false };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        s$.dispatch(this, 'stepOne', !this.state.stepOne);
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.stepOne ? 'S1 true' : 'S1 false' }
            </div>
        );
    }
}

export class StepTwo extends React.Component {
    // store globally
    constructor(props) {
        super(props);
        this.state = {
            stepTwo: false,
            globalStepTwo: false,
        };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        s$.dispatch(this, 'stepTwo', !this.state.stepTwo, { globally: true });
        this.setState({ globalStepTwo: s$.getGlobal('stepTwo') });
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.globalStepTwo ? 'S2 true' : 'S2 false' }
            </div>
        );
    }
}

export class StepThree extends React.Component {
    // set state through observer
    constructor(props) {
        super(props);
        this.state = { stepThree: false };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        const onSuccess = () => {
            const stepThree = !this.state.stepThree;
            this.setState({ stepThree });
            return stepThree;
        };

        s$.dispatch(this, 'stepThree', null, { onSuccess });
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.stepThree ? 'S3 true' : 'S3 false' }
            </div>
        );
    }
}

export class StepFour extends React.Component {
    // set state through promise
    constructor(props) {
        super(props);
        this.state = { stepFour: '' };
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        s$.subscribe(this);
    }

    onSuccess() {
        const result = 'success';
        const promise = new Promise((resolve, _) => resolve());
        const onSuccess = () => {
            this.setState({ stepFour: result });
            return result;
        };

        s$.dispatch(this, 'stepFour', promise, { onSuccess });
    }

    onError() {
        const result = 'error';
        const promise = new Promise((_, reject) => reject());
        const onError = () => {
            this.setState({ stepFour: result });
            return result;
        };

        s$.dispatch(this, 'stepFour', promise, { onError });
    }

    render() {
        return (
            <div>
                <div onClick={this.onSuccess} id="success">
                    { this.state.stepFour }
                </div>
                <div onClick={this.onError} id="error">
                    { this.state.stepFour }
                </div>
            </div>
        );
    }
}

export class StepFive extends React.Component {
    // set state on complete
    constructor(props) {
        super(props);
        this.state = { stepFive: '' };
        this.onComplete = this.onComplete.bind(this);

        s$.subscribe(this);
    }

    onComplete() {
        const result = 'unsubscribed';
        const promise = new Promise((resolve) => resolve());
        const getStepFive = () =>  s$.get(this, 'stepFive');
        const onSuccess = () => result;
        const onComplete = () => this.setState({ stepFive: getStepFive() });

        s$.dispatch(this, 'stepFive', promise, { onSuccess, onComplete });
    }

    render() {
        return (
            <div onClick={this.onComplete}>
                { this.state.stepFive }
            </div>
        );
    }
}