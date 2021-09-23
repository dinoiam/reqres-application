import React from 'react';
import { Login } from '@src/pages/Login';
import { Home } from '@src/pages/Home';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConditionalRoute } from './components/hoc/ConditionalRoute';
import { getIsUserAuthenticated } from './redux/reducer/auth';
import { GlobalStyle } from './styles/GlobalStyle';
import { ErrorPanel } from './components/layout/ErrorPanel';
import { useAppSelector } from './hooks/useReduxhooks';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { homeRoot, loginRoot } from './utils/rootPaths';

function App(): JSX.Element {
  const isUserAutenticated = useAppSelector(getIsUserAuthenticated);

  return (
    <>
      <LoadingScreen />
      <GlobalStyle />
      <ErrorPanel />
      <Router>
        <Switch>
          <ConditionalRoute condition={!isUserAutenticated} component={Login} path={loginRoot} />
          <ConditionalRoute
            condition={isUserAutenticated}
            component={Home}
            path={homeRoot}
            redirectPath={loginRoot}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
