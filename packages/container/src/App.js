import React, {lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect} from 'react-router-dom';

import Progress from "./components/Progress";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createBrowserHistory } from 'history';

const MarketingApp = lazy(()=> import('./components/MarketingApp')); 
const AuthApp = lazy(()=> import('./components/AuthApp'));
const DashboardApp = lazy(()=>import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix:'co',
});

const history = createBrowserHistory();

export default ()=>{
    const [ isSignedIn, setIsSignIn ] = useState(false);

    useEffect(()=>{
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn]);
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={()=>setIsSignIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress/>} >
                        <Switch>
                            <Route path="/auth">
                                <AuthApp onSignIn={ ()=> setIsSignIn(true) } />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardApp />
                            </Route>
                            <Route path="/" component={MarketingApp} />

                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};