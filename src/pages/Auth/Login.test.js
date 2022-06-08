import React from 'react'
import renderer from 'react-test-renderer';

import Login from './Login'
import { connect } from 'react-redux';

import { isAuthenticated } from '../../helpers/aws';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });



describe('Test case for testing login', () => {
    let wrapper;
    test('username check', () => {
        wrapper = shallow(<MemoryRouter><Login.WrappedComponent /></MemoryRouter>);
        console.log(wrapper.find('input[name="email"]'))
        //wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'okurakantaro' } });
        //expect(wrapper.state('formik.values.email')).toEqual('okurakantaro');
    })
    // it('password check', () => {
    //     wrapper = shallow(<Login />);
    //     wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'Abcabc123!' } });
    //     expect(wrapper.state('password')).toEqual('Abcabc123!');
    // })
    // it('login check with right data', () => {
    //     wrapper = shallow(<Login />);
    //     wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'okurakantaro' } });
    //     wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'Abcabc123!' } });
    //     wrapper.find('button').simulate('click');
    //     //expect(wrapper.state('isLogined')).toBe(true);
    // })
    // it('login check with wrong data', () => {
    //     wrapper = shallow(<Login />);
    //     wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'okurakantaro' } });
    //     wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'okurakantaro' } });
    //     wrapper.find('button').simulate('click');
    //     //expect(wrapper.state('isLogined')).toBe(false);
    // })
})


