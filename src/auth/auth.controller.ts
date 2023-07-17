import { Controller, Get, Logger, Post, Request, Res, UseGuards, Body } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() new_user: UserDto): Promise<any> {
        const user = await this.userService.createUser(new_user);

        return this.authService.login(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    google_auth(@Request() req): any {
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async google_auth_callback(@Request() req, @Res() res): Promise<any> {

        let user = await this.userService.findOneByGoogleId(req.user.google_id);

        if (!user) {
            user = await this.userService.createSocialAuthUser(req.user);
        }

        const token = this.authService.login(user);

        res.status(301).redirect(`fridsch://http://localhost:3333/callback?token=${token.access_token}`);
    }
}