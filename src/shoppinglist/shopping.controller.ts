import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StorageDto } from 'src/dtos/storage.dto';
import { HouseholdService } from 'src/household/household.service';
import { ShoppingList } from './shopping.entity';
import { ShoppingListService } from './shopping.service';

@Controller('shoppinglists')
export class ShoppingListController {

    constructor(private readonly shoppingService: ShoppingListService, private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async findAll(@Body('id') id: number, @Request() req): Promise<ShoppingList[]> {
        if ((await this.householdService.isAccessGranted(req.user, id))) {
            return this.shoppingService.findAll(id);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() shoppingListDto: StorageDto, @Request() req): Promise<ShoppingList> {
        if ((await this.householdService.isAccessGranted(req.user, shoppingListDto.household_id))) {
            return this.shoppingService.create(shoppingListDto);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('length')
    async getLength(@Body('household_id') household_id: number, @Body('name') name: string, @Request() req): Promise<number> {
        if (await this.householdService.isAccessGranted(req.user, household_id)) {
            return this.shoppingService.getNumberofItems(name, household_id);
        } else {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('finish')
    async finishShopping(@Body('household_id') household_id: number, @Body('name') name: string, @Body('storage') storage: string, @Request() req) {
        if (await this.householdService.isAccessGranted(req.user, household_id)) {
            return this.shoppingService.finishShopping(name, household_id, storage);
        } else {
            throw new UnauthorizedException();
        }
    }
}
