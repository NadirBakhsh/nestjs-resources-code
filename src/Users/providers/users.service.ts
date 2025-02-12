import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      { firstName: 'John', email: 'john@example.com' },
      { firstName: 'Jane', email: 'jane@example.com' },
    ];
  }
}
