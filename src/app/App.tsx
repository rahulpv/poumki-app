import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../features/home/Home'));
const UserList = lazy(() => import('../features/user/UserList'));
const UserAdd = lazy(() => import('../features/user/UserAdd'));
const Detection = lazy(() => import('../features/detection/Detection'));


const App: FC = () => {

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users/add" component={UserAdd}/>
                    <Route path="/users" component={UserList}/>
                    <Route path="/detection" component={Detection}/>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;