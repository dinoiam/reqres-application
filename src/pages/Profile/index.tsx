import React from 'react';
import { Form } from '@src/components/layout/Form';
import { useCreateProfile, useUpdateProfile } from './hooks';
import { ProfileViewProps } from './types';
import styled from 'styled-components';

const StyledProfileView = styled.div`
  padding: 50px;
  max-width: 400px;
  margin: 0 auto;
`;

export const ProfileView = ({
  buttonLabel,
  formElements,
  onClickButton,
  buttonId
}: ProfileViewProps): JSX.Element => {
  return (
    <StyledProfileView>
      <Form
        formElements={formElements}
        buttonLabel={buttonLabel}
        onClickButton={onClickButton}
        buttonId={buttonId}
      ></Form>
    </StyledProfileView>
  );
};

export const CreateProfile = (): JSX.Element => ProfileView(useCreateProfile());
export const UpdateProfile = (): JSX.Element => ProfileView(useUpdateProfile());
