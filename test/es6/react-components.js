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
    // store globally
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