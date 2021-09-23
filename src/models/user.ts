export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type GetUsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }>;
};

export type FetchUsersRequestPayload = {
  page?: number;
};
export type FetchUsersRequestError = {
  rejectValue: {
    errorMessage: string;
  };
};

export type LoginRequestSuccessful = {
  token: string;
};
