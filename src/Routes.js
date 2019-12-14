import React from 'react'
import { Switch, Route} from 'react-router-dom';
import Dashboard from './components/dashboard';
import UnitStations from './components/unitstations';
import LoanStatus from './components/loanstatus';
import NotFound from './components/404';


const Routes = () => (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/unitstations' component={UnitStations} />
        <Route path='/loanstatus' component={LoanStatus} />
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;