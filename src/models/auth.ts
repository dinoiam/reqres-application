export type LoginRequestPayload = {
  email: string;
  password: string;
};
export type LoginRequestError = {
  rejectValue: {
    errorMessage: string;
  };
};

export type LoginRequestSuccessful = {
  token: string;
};
