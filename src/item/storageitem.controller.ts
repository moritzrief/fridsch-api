import { Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StorageItemDto } from 'src/dtos/storageitem.dto';
import { HouseholdService } from 'src/household/household.service';
import { ItemService } from './item.service';
import { StorageItem } from './storageitem.entity';

@Controller('storageitems')
export class StorageItemController {

    constructor(private readonly itemService: ItemService, private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createStorageItem(@Body() sItemDTO: StorageItemDto, @Request() req): Promise<StorageItem> {
        if (await this.householdService.isAccessGranted(req.user, sItemDTO.household_id)) {
            return this.itemService.createStorageItem(sItemDTO);
        }
        else throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async getItemsFromStorage(@Body('id') id: number,
        @Body('name') name: string,
        @Request() req
    ): Promise<StorageItem[]> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.getAllStorageItems(name, id);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('filter')
    async filterItems(@Body('id') id: number,
        @Body('name') name: string,
        @Body('filter') filter: string,
        @Request() req
    ): Promise<StorageItem[]> {
        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.filterStorageItems(name, id, filter);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async delete(@Body('id') id: number,
        @Body('name') name: string,
        @Body('item_id') item_id: number,
        @Body('created_at') created_at: Date,
        @Request() req
    ): Promise<any> {

        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.deleteStorageItem(item_id, name, id, created_at);
        }
        throw new UnauthorizedException();
    }
}