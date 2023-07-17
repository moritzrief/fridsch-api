import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdModule } from 'src/household/household.module';
import { ItemModule } from 'src/item/item.module';
import { StorageController } from './storage.controller';
import { Storage } from './storage.entity';
import { StorageService } from './storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Storage]), HouseholdModule, ItemModule],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [TypeOrmModule, StorageModule],
})
export class StorageModule { }
