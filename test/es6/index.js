// import 'jsdom-global/register';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import {
    StepOne,
    StepTwo,
    StepThree,
    StepFour
} from './react-components';

it('Test basic functionality', () => {
    const div = shallow(<StepOne  />);

    assert(div.text() === 'S1 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S1 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S1 false');
});

it('Test global storage', () => {
    const div = shallow(<StepTwo />);

    assert(div.text() === 'S2 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S2 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S2 false');
});

it('Test callbacks', () => {
    const div = shallow(<StepThree />);

    assert(div.text() === 'S3 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S3 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S3 false');
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