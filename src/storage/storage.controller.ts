import { Body, Controller, Get, Logger, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StorageDto } from 'src/dtos/storage.dto';
import { HouseholdService } from 'src/household/household.service';
import { Storage } from './storage.entity';
import { StorageService } from './storage.service';

@Controller('storages')
export class StorageController {

    constructor(private readonly storageService: StorageService, private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async findByHousehold(@Body('id') id: number, @Request() req): Promise<Storage[]> {

        if ((await this.householdService.isAccessGranted(req.user, id))) {
            return this.storageService.getByHouseholdId(id);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() storageDto: StorageDto, @Request() req): Promise<Storage> {

        if (await this.householdService.isAccessGranted(req.user, storageDto.household_id)) {
            return this.storageService.create(storageDto);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async delete(@Body('id') id: number, @Body('name') name: string, @Request() req): Promise<Storage> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.storageService.delete(id, name);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('length')
    async getLength(@Body('household_id') household_id: number, @Body('name') name: string, @Request() req): Promise<number> {
        if (await this.householdService.isAccessGranted(req.user, household_id)) {
            return this.storageService.getNumberofItems(name, household_id);
        } else {
            throw new UnauthorizedException();
        }
    }
}
