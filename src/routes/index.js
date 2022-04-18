import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect,useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
//import routes
import { authProtectedRoutes, publicRoutes } from './routes';

//import layouts
import NonAuthLayout from "../layouts/NonAuth";
import AuthLayout from "../layouts/AuthLayout/";

import {isAuthenticated} from "./../helpers/aws"
import { loginUserSuccess } from '../redux/actions';


// handle auth and authorization
const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, props_user,...rest }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    return <Route {...rest} render={props => {
        if(isAuthProtected && process.env.REACT_APP_DEFAULTAUTH === "aws"){
            isAuthenticated().then((user)=>{
            //alert("aaaaaaaaaaaaaaaaa")
            // return (
            //     <Redirect to={{ pathname: "/login", state: { from: props.location} }} />
            // );
            if(props_user === null)
                dispatch(loginUserSuccess(user))
            },(error)=>{
                //alert("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
                // return (
                //     <Redirect to={{ pathname: "/index", state: { from: props.location } }} />
                // );
                history.push("/index")
                 
            })
        }
        else if (isAuthProtected && !localStorage.getItem("authUser")) {
            return (
                <Redirect to={{ pathname: "/index", state: { from: props.location } }} />
            );
        }
        
        // authorised so return component
        return <Layout><Component {...props} /></Layout>
    }} />  
}

/**
 * Main Route component
 */
const Routes = (props) => {
   
    return (
        // rendering the router with layout
        <BrowserRouter>
            <React.Fragment>
            <Suspense fallback = {<div></div>} >
                <Switch>
                    {/* public routes */}
                    {publicRoutes.map((route, idx) =>
                        <AppRoute path={route.path} layout={NonAuthLayout} component={route.component}
                            key={idx} isAuthProtected={false} props_user={props.user}/>
                    )}

                    {/* private/auth protected routes */}
                    {authProtectedRoutes.map((route, idx) =>
                        <AppRoute path={route.path} layout={AuthLayout} component={route.component}
                            key={idx} isAuthProtected={true} props_user={props.user}/>
                    )}
                </Switch>
            </Suspense>
            </React.Fragment>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default (connect(mapStateToProps)(Routes));