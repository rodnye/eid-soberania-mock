export interface UserDto {
  cid: string;
  phone: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  isEmailVerified?: boolean;
  oauth2Provider?: string;
  oauth2Id?: string;
}
