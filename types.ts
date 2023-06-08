export type RootStackParamList = {
  Main: {emailUser: String};
  Login: {itemId: number};
  NewShift: {};
  Detail: {itemName: String};
  SignUp: {};
  // ...
};

export type UserDataXHR = {
  user: {};
  setUser: any;
};
