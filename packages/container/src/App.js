import React, {lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//import MarketingApp from "./components/MarketingApp";
//import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const MarketingApp = lazy(()=> import('./components/MarketingApp')); 
const AuthApp = lazy(()=> import('./components/AuthApp')); 
const generateClassName = createGenerateClassName({
    productionPrefix:'co',
});
export default ()=>{
    const [ isSignedIn, setIsSignIn ] = useState(false);
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={()=>setIsSignIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress/>} >
                        <Switch>
                            <Route path="/auth">
                                <AuthApp onSignIn={ ()=> setIsSignIn(true) } />
                            </Route>
                            <Route path="/" component={MarketingApp} />

                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};