import { homeRoot } from '@src/utils/rootPaths';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = {
  /** The component to render in case the route path and the condition is matched */
  component: () => JSX.Element;
  /** The condition used to render the component or Redirect to a specific path */
  condition: boolean;
  /** The redirect path, default '/' */
  redirectPath?: string;
} & RouteProps;

export const ConditionalRoute = ({
  exact = true,
  component: Component,
  condition,
  redirectPath = homeRoot,
  path,
  ...rest
}: Props): JSX.Element => {
  return (
    <Route exact={exact} path={path} {...rest}>
      {condition ? <Component /> : <Redirect to={{ pathname: redirectPath }} />}
    </Route>
  );
};
