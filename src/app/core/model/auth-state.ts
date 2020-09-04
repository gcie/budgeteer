import { UserInfo } from 'firebase';

export class AuthState {
  resolved: boolean;
  user: UserInfo;
}
