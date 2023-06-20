export type UserData = {
  additionalUserInf: {
    isNewUser: Boolean;
  };
  user: {
    displayName: String;
    email: String;
    emailVerified: Boolean;
    isAnonymous: Boolean;
    metadata: [];
    multiFactor: [];
    phoneNumber: String;
    photoURL: String;
    providerData: [];
    providerId: String;
    tenantId: Number;
    uid: String;
  };
};

export default UserData;
