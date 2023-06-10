export type RootStackParamList = {
  Main: {emailUser: String};
  Login: {itemId: number};
  NewShift: {};
  Detail: {projectName: String};
  SignUp: {};
  // ...
};

export type UserDataXHR = {
  user: {};
  setUser: any;
};
