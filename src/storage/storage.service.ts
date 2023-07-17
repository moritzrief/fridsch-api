import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageDto } from 'src/dtos/storage.dto';
import { StorageItem } from 'src/item/storageitem.entity';
import { Repository } from 'typeorm';
import { Storage } from './storage.entity';

@Injectable()
export class StorageService {

    constructor(@InjectRepository(Storage) private storageRepository: Repository<Storage>, @InjectRepository(StorageItem) private storageItemRepository: Repository<StorageItem>) { }

    getByHouseholdId(household_id: number): Promise<Storage[]> {
        return this.storageRepository.findBy({ household_id });
    }

    create(storageDto: StorageDto): Promise<Storage> {
        const newStorage = this.storageRepository.create(storageDto);
        return this.storageRepository.save(newStorage);
    }

    delete(household_id: number, name: string): any {
        return this.storageRepository.delete({ household_id, name });
    }

    async getNumberofItems(storageName: string, householdId: number): Promise<number> {
        const res = await this.storageItemRepository.createQueryBuilder('si')
            .innerJoin('storage', 's', 'si.storage_name = s.name AND si.household_id = s.household_id')
            .where('s.name = :name', { name: storageName })
            .andWhere('s.household_id  = :id', { id: householdId })
            .andWhere('si.removed_at IS NULL')
            .getMany();
        return res.length;
    }
}
