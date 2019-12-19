import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/box/:id" component={Box} />
        </Switch>
    </Router>
);

export default Routes;