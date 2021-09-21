import React from 'react';
import { Login } from '@src/pages/Login';
import { Home } from '@src/pages/Home';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConditionalRoute } from './components/hoc/ConditionalRoute';
import { useSelector } from 'react-redux';
import { getIsUserAuthenticated } from './redux/reducer/auth';
import { GlobalStyle } from './styles/GlobalStyle';
import { ErrorPanel } from './components/layout/ErrorPanel';

function App(): JSX.Element {
  const isUserAutenticated = useSelector(getIsUserAuthenticated);

  return (
    <>
      <GlobalStyle />
      <ErrorPanel />
      <Router>
        <Switch>
          <ConditionalRoute condition={!isUserAutenticated} component={Login} path="/login" />
          <ConditionalRoute
            condition={isUserAutenticated}
            component={Home}
            path="/"
            redirectPath="/login"
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
