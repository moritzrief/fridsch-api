import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { HouseholdController } from './household.controller';
import { Household } from './household.entity';
import { HouseholdService } from './household.service';

require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forFeature([Household, User]), JwtModule.register({
    secret: process.env.HOUSEHOLD_JWT_SECRET,
    signOptions: { expiresIn: '1800s' }
  })],
  controllers: [HouseholdController],
  providers: [HouseholdService],
  exports: [TypeOrmModule, HouseholdModule, HouseholdService],
})
export class HouseholdModule { }
