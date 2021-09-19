import React from 'react';
import { Login } from '@src/pages/Login';
import { Home } from '@src/pages/Home';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConditionalRoute } from './components/hoc/ConditionalRoute';
import { useSelector } from 'react-redux';
import { getIsUserAuthenticated } from './redux/reducer/auth';

export const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1;
    font-size: 18px;
    letter-spacing: 2px;
    font-family: 'sans-serif';
  }

  #root {
    min-height: 100vh;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
      font: inherit;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
      }
      
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
  }
`;

function App(): JSX.Element {
  const isUserAutenticated = useSelector(getIsUserAuthenticated);

  return (
    <>
      <GlobalStyle />
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
