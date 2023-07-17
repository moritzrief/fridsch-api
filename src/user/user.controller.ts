import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('userdata')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getInfo(@Request() req): Promise<User> {
        return this.userService.findOne(req.user);
    }
}
