import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../screens/Landing';
import OrphanagesMap from '../screens/OrphanagesMap';

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/orfanatos" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;