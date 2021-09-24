import { homeRoot } from '@src/utils/rootPaths';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const ConditionalRoute = ({
  exact = true,
  component: Component,
  condition,
  redirectPath = homeRoot,
  path,
  ...rest
}: {
  exact?: boolean;
  component: () => JSX.Element;
  condition: boolean;
  redirectPath?: string;
} & RouteProps): JSX.Element => {
  return (
    <Route exact={exact} path={path} {...rest}>
      {condition ? <Component /> : <Redirect to={{ pathname: redirectPath }} />}
    </Route>
  );
};
