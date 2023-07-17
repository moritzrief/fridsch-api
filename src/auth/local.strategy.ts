import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'pwd',
        });
    }

    async validate(email: string, pwd: string): Promise<any> {
        const user = await this.authService.validateUser(email, pwd);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}