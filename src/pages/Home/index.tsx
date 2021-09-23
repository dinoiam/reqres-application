import Layout from '@src/components/hoc/Layout';
import { useCheckTokenOnRouteChange } from '@src/hooks/useCheckTokenOnRouteChange';
import { createProfileRoot, homeRoot, updateProfileRoot } from '@src/utils/rootPaths';
import React from 'react';
import { Route } from 'react-router-dom';
import { CreateProfile, UpdateProfile } from '../Profile';
import { SearchList } from '../SearchList';

export const Home = (): JSX.Element => {
  useCheckTokenOnRouteChange();

  return (
    <Layout>
      <Route exact={true} path={homeRoot}>
        <SearchList></SearchList>
      </Route>
      <Route exact={true} path={createProfileRoot}>
        <CreateProfile></CreateProfile>
      </Route>
      <Route exact={true} path={updateProfileRoot}>
        <UpdateProfile></UpdateProfile>
      </Route>
    </Layout>
  );
};
