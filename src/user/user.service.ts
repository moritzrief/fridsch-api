import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as argon2 from "argon2";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(uuid: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ uuid });
        user.households = undefined;
        return user;
    }

    findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email: email }, select: ['uuid', 'displayName', 'email', 'password'] });
    }

    findOneByGoogleId(google_id: string): Promise<User> {
        return this.userRepository.findOneBy({ google_id });
    }

    async remove(uuid: string): Promise<void> {
        await this.userRepository.delete(uuid);
    }

    async createSocialAuthUser(user: User): Promise<User> {

        const google_user = this.userRepository.create({
            displayName: user.displayName,
            email: user.email,
            google_id: user.google_id,
        });

        const new_user = await this.userRepository.save(google_user);

        Logger.log(new_user);

        return new_user;
    }

    async createUser(user: UserDto): Promise<User> {

        const normal_user = this.userRepository.create(user);
        normal_user.password = await argon2.hash(normal_user.password);
        const new_user = await this.userRepository.save(normal_user);

        Logger.log(new_user);
        return new_user;
    }
}