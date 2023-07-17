import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseholdDto } from 'src/dtos/household.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Household } from './household.entity';

@Injectable()
export class HouseholdService {

    constructor(@InjectRepository(Household) private householdRepository: Repository<Household>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) { }

    async findAllForUser(uuid: string): Promise<Household[]> {

        //ToDo check why this returns smth when uuid = undefined
        const user = await this.userRepository.findOneBy({ uuid });
        //Logger.log(`${uuid} -> ${user.uuid}, ${user.displayName}, ${user.email}`);

        return this.householdRepository.createQueryBuilder("household")
            .leftJoin("householduser", "hu", "hu.householdId = household.id")
            .where("household.admin = :uuid", { uuid: user.uuid })
            .orWhere("hu.userUuid = :uuid", { uuid: user.uuid })
            .getMany();
        // return this.householdRepository
        //     .createQueryBuilder("household")
        //     .leftJoin("HOUSEHOLDUSER", "hu", "hu.HOUSEHOLD_ID = household.ID")
        //     .where("household.USER_ID = :id", { id: user_id })
        //     .orWhere("hu.USER_ID = :id", { id: user_id })
        //     .getMany();
    }

    findAllWhereUserIsAdmin(uuid: string): Promise<Household[]> {
        return this.householdRepository.find({ select: { id: true, name: true, emoji: true }, where: { admin: { uuid } } });
    }

    async remove(uuid: string, id: number): Promise<any> {

        const household = await this.householdRepository.findOneBy({ id, admin: { uuid } });

        if (household == null) {
            return { "status": "Either the Household you tried to delete doesn't exist or you are not the admin." };
        }
        await this.householdRepository.delete(household); //maybe cascade householditems and so on
        return { "status": "Success!" };
    }

    async create(uuid: string, householdDto: HouseholdDto): Promise<Household> {
        const new_household = this.householdRepository.create(householdDto);
        new_household.admin = <any>uuid;
        return this.householdRepository.save(new_household);
    }

    async update(uuid: string, id: number, householdDto: HouseholdDto): Promise<Household> {

        if ((await this.findAllWhereUserIsAdmin(uuid)).some(h => h.id == id)) {
            const old_household = await this.householdRepository.findOneBy({ id });
            old_household.name = householdDto.name;
            old_household.emoji = householdDto.emoji;
            return this.householdRepository.save(old_household);
        } else {
            throw new UnauthorizedException();
        }
    }

    async isAccessGranted(uuid: string, id: number): Promise<Boolean> {
        return (await this.findAllForUser(uuid)).map(h => h.id).some(h => h == id);
    }

    find(id: number): Promise<Household> {
        return this.householdRepository.findOneBy({ id });
    }

    async createToken(id: number): Promise<any> {
        return { token: await this.jwtService.signAsync({ sub: id }) };
    }

    async join(jwt: string, uuid: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(jwt);
            const id = payload.sub;
            Logger.log(`${id} ${uuid}`);
            const user = await this.userRepository.findOneBy({ uuid });
            const household = await this.householdRepository.findOneBy({ id });

            user.households.push(household);
            this.userRepository.save(user);

            return { success: true };
        } catch (e) {
            Logger.log(e);
            return { success: false };
        }
    }
}
