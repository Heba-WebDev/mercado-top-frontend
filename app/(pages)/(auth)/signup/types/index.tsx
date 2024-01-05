export type ISignUp = {
  name: string;
  username: string;
  email: string;
  password: string;
  country: string;
  profile_picture: File | null;
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
