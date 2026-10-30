import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface StoredUser {
  phone: string;
  pinHash: string;
}

/**
 * In-memory stand-in for the Users table until Postgres/Supabase is wired
 * up (see "Déploiement et stockage" in the technical proposal doc).
 * Swap this.users for a real repository once TypeORM/Prisma is connected —
 * the public methods' signatures should not need to change.
 */
@Injectable()
export class AuthService {
  private readonly users = new Map<string, StoredUser>();

  async register(phone: string, pin: string): Promise<{ phone: string }> {
    if (this.users.has(phone)) {
      throw new ConflictException('A account already exists for this phone number');
    }
    const pinHash = await bcrypt.hash(pin, 10);
    this.users.set(phone, { phone, pinHash });
    return { phone };
  }

  async login(phone: string, pin: string): Promise<{ phone: string; token: string }> {
    const user = this.users.get(phone);
    if (!user || !(await bcrypt.compare(pin, user.pinHash))) {
      throw new UnauthorizedException('Invalid phone number or PIN');
    }
    // TODO: issue a real JWT once the Users module tracks sessions.
    return { phone: user.phone, token: `stub-token-${phone}` };
  }
}
