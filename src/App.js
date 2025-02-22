import React from 'react';
import Routes from './routes/';


//Import Scss
// import  "./assets/scss/themes.scss";
import "./assets/scss/_theme/index.scss"

//fackbackend
import fakeBackend from './helpers/fake-backend';

// //Firebase helper
// import { initFirebaseBackend } from "./helpers/firebase";


import ThemeProvider from "./Contexts/ThemeProvider";

import {ApolloProvider} from "@apollo/client";

import apollo_client from "./apollo"


//import { StatusBar } from '@capacitor/status-bar';
//import { Capacitor } from '@capacitor/core';


// TODO
fakeBackend();

//if (Capacitor.isNativePlatform()) {
//   StatusBar.hide();
// }
// StatusBar.hide();

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_APIKEY,
// 	authDomain: process.env.REACT_APP_AUTHDOMAIN,
// 	databaseURL: process.env.REACT_APP_DATABASEURL,
// 	projectId: process.env.REACT_APP_PROJECTID,
// 	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// 	appId: process.env.REACT_APP_APPID,
// 	measurementId: process.env.REACT_APP_MEASUREMENTID,
// };
  
// // init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  return (
    <ApolloProvider client={apollo_client}>
      <ThemeProvider>
        <div className='iphone-header'></div>
        <Routes />
        <div className='iphone-footer'></div>
      </ThemeProvider>
    </ApolloProvider>
    
  );
}

export default App;
