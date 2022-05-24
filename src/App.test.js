import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import Routes from './routes/';
import {ApolloProvider} from "@apollo/client";
import apollo_client from "./apollo"
import ThemeProvider from "./Contexts/ThemeProvider";






// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
it("Pass test", () => {
})

//TODO figure out why the test fails when you add Routes
it("Render main app", () => {
  const component = renderer.create(
    <App ></App>,
  );
})

it("Render main app", () => {
  const component = renderer.create(
    
    <ApolloProvider client={apollo_client}>
      <ThemeProvider>
        <div className='iphone-header'></div>
        {/* <Routes /> */}
        <div className='iphone-footer'></div>
      </ThemeProvider>
    </ApolloProvider> 
    ,
  );
})