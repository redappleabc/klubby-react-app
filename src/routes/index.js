import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//import routes
import { authProtectedRoutes, publicRoutes } from './routes';

//import layouts
import NonAuthLayout from "../layouts/NonAuth";
import AuthLayout from "../layouts/AuthLayout/";

// handle auth and authorization
const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, ...rest }) => {
    return <Route {...rest} render={props => {
        
        if (isAuthProtected && !localStorage.getItem("authUser")) {
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
                            key={idx} isAuthProtected={false} />
                    )}

                    {/* private/auth protected routes */}
                    {authProtectedRoutes.map((route, idx) =>
                        <AppRoute path={route.path} layout={AuthLayout} component={route.component}
                            key={idx} isAuthProtected={true} />
                    )}
                </Switch>
            </Suspense>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default Routes;