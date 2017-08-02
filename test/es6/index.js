// import 'jsdom-global/register';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { StepOne, StepTwo, StepThree } from './react-components';

it('StepOne - test basic storage', () => {
    const div = shallow(<StepOne  />);

    assert(div.text() === 'S1 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S1 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S1 false');
});

it('StepTwo - test global storage', () => {
    const div = shallow(<StepTwo />);

    assert(div.text() === 'S2 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S2 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S2 false');
});

it('StepThree - test callbacks', () => {
    const div = shallow(<StepThree />);

    assert(div.text() === 'S3 false');

    div.find('div').simulate('click');
    assert(div.text() === 'S3 true');

    div.find('div').simulate('click');
    assert(div.text() === 'S3 false');
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