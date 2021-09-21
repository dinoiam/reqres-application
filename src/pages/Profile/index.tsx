import { Form } from '@src/components/layout/Form';
import React from 'react';
import styled from 'styled-components';
import { useCreateProfile, useUpdateProfile } from './hooks';
import { ProfileViewProps } from './types';

const StyledProfileView = styled.div`
  padding: 50px;
`;

export const ProfileView = ({
  buttonLabel,
  formElements,
  onClickButton
}: ProfileViewProps): JSX.Element => {
  return (
    <StyledProfileView>
      <Form
        formElements={formElements}
        buttonLabel={buttonLabel}
        onClickButton={onClickButton}
      ></Form>
    </StyledProfileView>
  );
};

export const CreateProfile = (): JSX.Element => ProfileView(useCreateProfile());
export const UpdateProfile = (): JSX.Element => ProfileView(useUpdateProfile());
