import Layout from '@src/components/hoc/Layout';
import { useCheckTokenOnRouteChange } from '@src/hooks/useCheckTokenOnRouteChange';
import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from '../Profile';
import { SearchList } from '../SearchList';

export const Home = (): JSX.Element => {
  useCheckTokenOnRouteChange();
  return (
    <Layout>
      <Route exact={true} path="/">
        <SearchList></SearchList>
      </Route>
      <Route exact={true} path="/profile">
        <Profile></Profile>
      </Route>
    </Layout>
  );
};
