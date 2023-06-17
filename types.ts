export type RootStackParamList = {
  Main: {emailUser: String};
  Login: {itemId: number};
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
