import React from 'react'
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

import { Provider } from 'react-redux';
import configureStore from '../../redux/store';
import { createStore } from 'redux'
// const store1 = createStore(reducer)



const store2 = configureStore()

it("Passed test", () => {
    const component = renderer.create(
        <Provider store={store2}>

        <Router><Login></Login></Router>,
        </Provider>
    );
})


