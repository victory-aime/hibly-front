export interface IUser {
  id?: string;
  name?: string;
  firstName?: string;
  email?: string;
  picture?: string;
  enabled2MFA?: boolean;
  preferredLanguage?: string | string[];
}

export interface IUpdateUserInfo extends IUser {
  newPassword?: string;
}
