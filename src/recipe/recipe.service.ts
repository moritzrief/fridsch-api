import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageItem } from 'src/item/storageitem.entity';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {

    constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
        @InjectRepository(StorageItem) private storageItemRepository: Repository<StorageItem>) { }


    async available(household_id: number): Promise<Recipe[]> {
        const available_items = await this.storageItemRepository.findBy({ household_id });
        const recipes = await this.recipeRepository.find();

        //get all recipes where the ingredients are available
        return recipes.filter(r => r.ingredients.map(i => i.id).every(el => available_items.filter(av => av.removed_at == null).map(av => av.item_id).includes(el)));
    }
}
