import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';

@Controller('units')
export class UnitController {

    constructor(private readonly unitService: UnitService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Unit[]> {
        return this.unitService.findAll();
    }
}
