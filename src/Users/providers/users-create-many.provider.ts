import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
  public async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];

    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // connect query runner to database
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      // release query runner
      await queryRunner.release();
    }

    return newUsers;
    // if successFul commit
    // if un-successFul rollback
    // Release Connection
  }
}
