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

it('Test basic functionality', () => {
    const component = shallow(<StepOne  />);

    assert(component.text() === 'S1 false');

    component.find('div').simulate('click');
    assert(component.text() === 'S1 true');

    component.find('div').simulate('click');
    assert(component.text() === 'S1 false');
});

it('Test global storage', () => {
    const component = shallow(<StepTwo />);

    assert(component.text() === 'S2 false');

    component.find('div').simulate('click');
    assert(component.text() === 'S2 true');

    component.find('div').simulate('click');
    assert(component.text() === 'S2 false');
});

it('Test callbacks', () => {
    const component = shallow(<StepThree />);

    assert(component.text() === 'S3 false');

    component.find('div').simulate('click');
    assert(component.text() === 'S3 true');

    component.find('div').simulate('click');
    assert(component.text() === 'S3 false');
});

it('Test promise success', () => {
    const component = shallow(<StepFour />);

    assert(component.text() === '');

    component.find('div#success').simulate('click');
    setTimeout(() => assert(component.find('div#success').text() === 'success'));
});

it('Test promise failure', () => {
    const component = shallow(<StepFour />);

    assert(component.text() === '');

    component.find('div#error').simulate('click');
    setTimeout(() => assert(component.find('div#error').text() === 'error'));
});

it('Test on complete', () => {
    const component = shallow(<StepFive />);

    assert(component.text() === '');

    component.find('div').simulate('click');
    setTimeout(() => assert(component.find('div').text() === 'unsubscribed'));
});

function it(string, fn) {
    try {
        fn();
        console.log(colorGreenPass(), string);
    }
    catch (e) {
        console.log(e);
    }
}

function colorGreenPass() {
    return colorGreen('pass');
}

function colorGreen(text) {
    return `\x1b[42m\x1b[30m ${text} \x1b[0m`;
}