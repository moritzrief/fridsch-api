import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HouseholdService } from 'src/household/household.service';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async findAll(@Body('id') id: number, @Request() req): Promise<Category[]> {
        return this.categoryService.findAllForHousehold(req.user, id);
    }
}
