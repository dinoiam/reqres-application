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
  /** Image url to show inside the card */
  image: string;
  /** A string representing the fist name */
  firstName: string;
  /** A string representing the last name */
  lastName: string;
  /** A string representing the email name */
  email: string;
  /** Callback function called on click on the card */
  onClick: () => void;
};

export const UserCard = memo(
  function UserCard({ firstName, image, lastName, email, onClick }: Props): JSX.Element {
    return (
      <UserCardComponent onClick={onClick}>
        <img src={image}></img>
        <UserCardInfo>
          <h3>
            {firstName} {lastName}
          </h3>
          <h4>{email}</h4>
        </UserCardInfo>
      </UserCardComponent>
    );
  },
  () => true
);
