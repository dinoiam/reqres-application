import React, { memo } from 'react';
import styled from 'styled-components';

const UserCardComponent = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  max-width: 400px;
  min-height: 100px;
  cursor: pointer;
`;

const UserCardInfo = styled.div`
  width: 300px;
  padding: 10px;
  font-size: 14px;
`;

type Props = {
  image: string;
  firstName: string;
  lastname: string;
  email: string;
  onClick: () => void;
};

export const UserCard = memo(
  function UserCard({ firstName, image, lastname, email, onClick }: Props): JSX.Element {
    return (
      <UserCardComponent onClick={onClick}>
        <img src={image}></img>
        <UserCardInfo>
          <h3>
            {firstName} {lastname}
          </h3>
          <h4>{email}</h4>
        </UserCardInfo>
      </UserCardComponent>
    );
  },
  () => true
);
