export type RootStackParamList = {
  Main: {};
  Login: {};
  Logout: {};
  NewShift: {};
  Detail: {projectSlug: String};
  SignUp: {};
  EditShift: {projectSlug: String};
  // ...
};

export type UserDataXHR = {
  user: {};
  setUser: any;
};
