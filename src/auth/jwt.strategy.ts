require('dotenv').config();
import { Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any): Promise<any> {

        //ToDo: versch strategies und guards mit versch secret für access und request token
        const uuid = payload.sub;

        return uuid;
    }
}