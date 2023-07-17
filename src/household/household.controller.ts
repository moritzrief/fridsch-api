import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HouseholdDto } from 'src/dtos/household.dto';
import { Household } from './household.entity';
import { HouseholdService } from './household.service';

@Controller('households')
export class HouseholdController {

    constructor(private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllFromUser(@Request() req): Promise<Household[]> {
        return this.householdService.findAllForUser(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAllWhereAdmin')
    findAllWhereUserIsAdmin(@Request() req): Promise<Household[]> {
        return this.householdService.findAllWhereUserIsAdmin(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Request() req, @Body() householdDto: HouseholdDto): Promise<Household> {
        return this.householdService.create(req.user, householdDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    update(@Request() req, @Body() householdDto: HouseholdDto, @Param('id') id): Promise<Household> {
        return this.householdService.update(req.user, id, householdDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: number, @Request() req): Promise<any> {
        return this.householdService.remove(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createtoken')
    async createJoinToken(@Body('household_id') id: number, @Request() req): Promise<any> {
        if ((await this.householdService.findAllWhereUserIsAdmin(req.user)).some(h => h.id == id)) {
            return this.householdService.createToken(id);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('join')
    join(@Body('household_jwt') jwt: string, @Request() req): Promise<any> {
        return this.householdService.join(jwt, req.user);
    }
}
