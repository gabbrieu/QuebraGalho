import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async encrypt(valor: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(valor, salt);
  }

  async decrypt(hash: string, valor: string): Promise<boolean> {
    return await bcrypt.compare(valor, hash);
  }
}
