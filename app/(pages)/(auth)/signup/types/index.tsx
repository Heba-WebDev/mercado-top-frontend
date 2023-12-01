export type ISignUp = {
  name: string;
  email: string;
  password: string;
  country: string;
};

export type ISignUpResponse = {
  status: string;
  message: string;
  data: {
    name: string;
    email: string;
    country: string;
  };
};
