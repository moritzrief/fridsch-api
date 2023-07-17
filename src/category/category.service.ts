import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseholdService } from 'src/household/household.service';
import { IsNull, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        private readonly householdService: HouseholdService
    ) { }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findAllForHousehold(uuid: string, id: number): Promise<Category[]> {

        if (!(await this.householdService.isAccessGranted(uuid, id))) {
            throw new UnauthorizedException();
        }

        return await this.categoryRepository.find({ select: { id: true, name: true}, where: [{ createdBy: IsNull() }, { createdBy: { id } }] });
    }
}
