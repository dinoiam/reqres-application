export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginRequestSuccessful = {
  token: string;
};

export type LoginRequestUnsuccessful = {
  error: string;
};
