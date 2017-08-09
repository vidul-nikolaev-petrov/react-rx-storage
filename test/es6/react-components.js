import React from 'react';
import Rx from 'rxjs/Rx';
import s$ from '../../indexES5';

export class StepOne extends React.Component {
    // basic storage functionaity
    constructor(props) {
        super(props);
        this.state = { testStep: false };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        s$.dispatch(this, 'testStep', !this.state.testStep);
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.testStep ? 'S1 true' : 'S1 false' }
            </div>
        );
    }
}

export class StepTwo extends React.Component {
    // store globally
    constructor(props) {
        super(props);
        this.state = {
            testStep: false,
            globalStepTwo: false,
        };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        s$.dispatch(this, 'testStep', !this.state.testStep, { globally: true });
        this.setState({ globalStepTwo: s$.getGlobal('testStep') });
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
        this.state = { testStep: false };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        const onSuccess = () => {
            const testStep = !this.state.testStep;
            this.setState({ testStep });
            return testStep;
        };

        s$.dispatch(this, 'testStep', null, { onSuccess });
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.testStep ? 'S3 true' : 'S3 false' }
            </div>
        );
    }
}

export class StepFour extends React.Component {
    // set state through promise
    constructor(props) {
        super(props);
        this.state = { testStep: '' };
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        s$.subscribe(this);
    }

    onSuccess() {
        const result = 'success';
        const promise = new Promise((resolve, _) => resolve());
        const onSuccess = () => {
            this.setState({ testStep: result });
            return result;
        };

        s$.dispatch(this, 'testStep', promise, { onSuccess });
    }

    onError() {
        const result = 'error';
        const promise = new Promise((_, reject) => reject());
        const onError = () => {
            this.setState({ testStep: result });
            return result;
        };

        s$.dispatch(this, 'testStep', promise, { onError });
    }

    render() {
        return (
            <div>
                <div onClick={this.onSuccess} id="success">
                    { this.state.testStep }
                </div>
                <div onClick={this.onError} id="error">
                    { this.state.testStep }
                </div>
            </div>
        );
    }
}

export class StepFive extends React.Component {
    // set state on complete
    constructor(props) {
        super(props);
        this.state = { testStep: '' };
        this.onComplete = this.onComplete.bind(this);

        s$.subscribe(this);
    }

    onComplete() {
        const result = 'unsubscribed';
        const promise = new Promise((resolve) => resolve());
        const getStepFive = () =>  s$.get(this, 'testStep');
        const onSuccess = () => result;
        const onComplete = () => this.setState({ testStep: getStepFive() });

        s$.dispatch(this, 'testStep', promise, { onSuccess, onComplete });
    }

    render() {
        return (
            <div onClick={this.onComplete}>
                { this.state.testStep }
            </div>
        );
    }
}

export class StepSix extends React.Component {
    // set state by observable
    constructor(props) {
        super(props);
        this.state = { testStep: 0 };
        this.onClick = this.onClick.bind(this);

        s$.subscribe(this);
    }

    onClick() {
        const source1 = Rx.Observable.of('Hello ');
        const source2 = Rx.Observable.of('World!');
        const sourceResult = Rx.Observable.zip(source1, source2);

        s$.dispatch(this, 'testStep', sourceResult);
    }

    render() {
        return (
            <div onClick={this.onClick}>
                { this.state.testStep }
            </div>
        );
    }
}