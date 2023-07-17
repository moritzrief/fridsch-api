import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "src/user/user.entity";

require('dotenv').config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_KEY,
            callbackURL: 'http://localhost:3333/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {

        const { name, emails, photos } = profile;

        const user = new User();
        user.email = emails[0].value;
        user.displayName = name.givenName;
        user.google_id = profile.id;

        return user;
    }
}