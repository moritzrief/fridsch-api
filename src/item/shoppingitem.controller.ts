import { Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShoppingItemDto } from 'src/dtos/shoppingitem.dto';
import { StorageItemDto } from 'src/dtos/storageitem.dto';
import { HouseholdService } from 'src/household/household.service';
import { ItemService } from './item.service';
import { ShoppingListItem } from './shoppingitem.entity';
import { StorageItem } from './storageitem.entity';

@Controller('shoppingitems')
export class ShoppingItemController {

    constructor(private readonly itemService: ItemService, private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createShoppingItem(@Body() sItemDTO: ShoppingItemDto, @Request() req): Promise<ShoppingListItem> {
        if (await this.householdService.isAccessGranted(req.user, sItemDTO.household_id)) {
            return this.itemService.createShoppingItem(sItemDTO);
        }
        else throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async getItemsFromShopping(@Body('id') id: number,
        @Body('name') name: string,
        @Request() req
    ): Promise<ShoppingListItem[]> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.findAllShoppingItems(name, id);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('changestatus')
    async changeStatus(@Body('id') id: number,
        @Body('name') name: string,
        @Body('item_id') item_id: number,
        @Body('status') status: boolean,
        @Request() req
    ): Promise<ShoppingListItem> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.changeStatus(item_id, name, id, status);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async delete(@Body('id') id: number,
        @Body('name') name: string,
        @Body('item_id') item_id: number,
        @Request() req
    ): Promise<any> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.deleteShoppingItem(item_id, name, id);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('addable')
    async getAddableItems(@Body('household_id') household_id: number, @Body('name') name: string, @Request() req):Promise<ShoppingListItem[]> {
        if (await this.householdService.isAccessGranted(req.user, household_id)) {
            return this.itemService.getPossibleShoppingListItems(household_id, name);
        } else {
            throw new UnauthorizedException();
        }
    }
}