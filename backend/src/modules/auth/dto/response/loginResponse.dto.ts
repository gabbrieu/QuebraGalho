import { Accounts } from '../../../accounts/accounts.entity';

export class LoginResponseDto {
  accessToken: string;
  user: Accounts;
}
