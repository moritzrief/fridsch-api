import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitService],
  exports: [TypeOrmModule, UnitModule],
  controllers: [UnitController],
})
export class UnitModule { }
