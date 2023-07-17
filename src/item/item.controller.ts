import { Request, Body, Controller, Post, UseGuards, UnauthorizedException, Logger, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItemDto } from 'src/dtos/item.dto';
import { HouseholdService } from 'src/household/household.service';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService, private readonly householdService: HouseholdService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    findAll(@Body('id') id: number, @Request() req): Promise<Item[]> {
        return this.itemService.findAllItems(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('filter')
    filterAll(@Body('id') id: number, @Body('filter') filter: string, @Request() req): Promise<Item[]> {
        return this.itemService.filterAllItems(id, filter);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body('h_id') id: number, @Body() itemDto: ItemDto, @Request() req): Promise<Item> {
        if (await this.householdService.isAccessGranted(req.user, id)) {
            return this.itemService.createItem(itemDto);
        } else {
            throw new UnauthorizedException();
        }
    }
}
