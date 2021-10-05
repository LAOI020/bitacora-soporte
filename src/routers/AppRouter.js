import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
} from 'react-router-dom';
import { HomeScreen } from '../components/HomeScreen';
import { HomeScreenDesktop } from '../components/HomeScreenDesktop';
import { LoginScreen } from '../components/LoginScreen';
import { getRequestsCompleted } from '../database/getRequestsCompleted';
import { listeningUpdateRequest } from '../database/listeningUpdateRequests';
import { verifyUser } from '../helpers/verifyUser';
import { RequestComplete } from '../ui/RequestComplete';


export const AppRouter = () => {
    console.log('app router');

    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        component={LoginScreen}
                    />

                    <Routes/>

                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}


const Routes = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData(){
            try {
                
                if(localStorage.getItem('rlwertk')){
                    await verifyUser(history, dispatch);

                    dispatch(listeningUpdateRequest());
    
                    dispatch(getRequestsCompleted());
                    
                } else {
                    history.replace('/login');
                }
                
                
            } catch (err) {
                console.log(err);
            }
        }
            
        fetchData();

    }, [dispatch, history]);

    console.log('routes from app router');

    return (
        <div>
            <Switch>                
                <Route
                    exact
                    path="/"
                    component={window.innerWidth > 1024 ?
                        HomeScreenDesktop
                        :
                        HomeScreen
                    }
                />

                <Route
                    exact
                    path="/report/:id"
                    component={window.innerWidth > 1024 ?
                        DesktopComponent
                        :
                        RequestComplete
                    }
                />
            </Switch>
        </div>
    )
}


const DesktopComponent = () => {
    return (
        <Redirect to="/"/>
    )
}
