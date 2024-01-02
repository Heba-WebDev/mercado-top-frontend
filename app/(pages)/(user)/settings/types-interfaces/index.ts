export interface FormValues {
  user_id: string;
  name: string | null;
  //username: string | null;
  email: string | null;
  password: string | null;
  //bio: string | null;
  country: string | null;
  profile_picture: File | null;
}

export type IModifySettings = {
  user_id: string;
  name: string | null;
  //username: string | null;
  email: string | null;
  password: string | null;
  //bio: string | null;
  country: string | null;
  profile_picture: File | null;
}


export type IDeleteAccount = {
  user_id: string
}
