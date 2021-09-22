import React from 'react';
import styled from 'styled-components';
import { Header } from '@src/components/layout/Header';

const LayoutComponent = styled.section`
  margin: 0 auto;
  max-width: 800px;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <LayoutComponent>
      <Header />
      {children}
    </LayoutComponent>
  );
}
