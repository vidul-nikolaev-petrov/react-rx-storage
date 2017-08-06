import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
} from './react-components';

it('Test basic functionality', label => {
    const component = shallow(<StepOne  />);
    const compFalse = () => assert.equal(component.text(), 'S1 false');
    const compTrue = () => assert.equal(component.text(), 'S1 true');

    promiseIt(compFalse);
    component.find('div').simulate('click');
    promiseIt(compTrue);
    component.find('div').simulate('click');
    promiseIt(compFalse, label);
});

it('Test global storage', (label) => {
    const component = shallow(<StepTwo />);
    const compFalse = () => assert.equal(component.text(), 'S2 false');
    const compTrue = () => assert.equal(component.text(), 'S2 true');

    promiseIt(compFalse);
    component.find('div').simulate('click');
    promiseIt(compTrue);
    component.find('div').simulate('click');
    promiseIt(compFalse, label);
});

it('Test callbacks', label => {
    const component = shallow(<StepThree />);
    const compFalse = () => assert.equal(component.text(), 'S3 false');
    const compTrue = () => assert.equal(component.text(), 'S3 true');

    promiseIt(compFalse);
    component.find('div').simulate('click');
    promiseIt(compTrue);
    component.find('div').simulate('click');
    promiseIt(compFalse, label);
});

it('Test promise success', label => {
    const component = shallow(<StepFour />);
    const compareInitial = () => assert.equal(component.text(), '');
    const compareFinal = () => assert.equal(component.find('div#success').text(), 'success');

    promiseIt(compareInitial);
    component.find('div#success').simulate('click');
    promiseItAsync(compareFinal, label);
});

it('Test promise failure', label => {
    const component = shallow(<StepFour />);
    const compareInitial = () => assert.equal(component.text(), '');
    const compareFinal = () => assert.equal(component.find('div#error').text(), 'error');

    promiseIt(compareInitial);
    component.find('div#error').simulate('click');
    promiseItAsync(compareFinal, label);
});

it('Test on complete', label => {
    const component = shallow(<StepFive />);
    const compareInitial = () => assert.equal(component.text(), '');
    const compareFinal = () => assert.equal(component.find('div').text(), 'unsubscribed');

    promiseIt(compareInitial);
    component.find('div').simulate('click');
    promiseItAsync(compareFinal, label);
});

function promiseIt(...args) {
    return promiseItSync(...args);
}

function promiseItSync(fn, label) {
    promise(fn, false, label);
}

function promiseItAsync(fn, label) {
    promise(fn, true, label);
}

function promise(fn, async, label) {
    new Promise((resolve, reject) => {
        const tryCatch = () => {
            try {
                fn();
                resolve(label);
            }
            catch (e) {
                reject(e);
            }
        };

        if (async) {
            setTimeout(tryCatch);
        }
        else {
            tryCatch();
        }
    })
    .then(
        s => s && console.log(colorGreenPass(), s),
        e => console.log(colorRed(e.name), e.message)
    );
};

function it(label, fn) {
    fn(label);
}

function colorGreenPass() {
    return colorGreen('pass');
}

function colorGreen(text) {
    return `\x1b[42m\x1b[30m ${text} \x1b[0m`;
}

function colorRed(text) {
    return `\x1b[41m\x1b[30m ${text} \x1b[0m`;
}