import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HouseholdService } from 'src/household/household.service';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {

    constructor(private readonly recipeService: RecipeService,
        private readonly householdService: HouseholdService) { }

    //@UseGuards(JwtAuthGuard)
    @Post()
    getAvailable(@Body('id') household_id: number, @Request() req): Promise<Recipe[]> {
      //  if (await this.householdService.isAccessGranted(req.user, household_id)) {
            return this.recipeService.available(household_id);
        //} else {
          //  throw new UnauthorizedException();
        //}
    }
}
