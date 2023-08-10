import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from "argon2";
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, pwd: string): Promise<User> {
        const user = await this.userService.findOneByEmail(email);

        if (user && await argon2.verify(user.password, pwd)) {
            Logger.log("password correct");
            user.password = undefined;
            return user;
        }

        return null;
    }

    login(user: User) {
        const payload = { sub: user.uuid };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
