export type RootStackParamList = {
  Main: {userId: number};
  Login: {itemId: number};
  NewShift: {itemId: number};
  Detail: {itemId: number};
  SignUp: {};
  // ...
};

export type UserDataXHR = {
  user: {},
  setUser: any
}