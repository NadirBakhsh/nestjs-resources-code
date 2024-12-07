import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'Get all users';
  }

  @Post()
  public createUser() {
    return 'Create user';
  }

  @Put()
  public updateUser() {
    return 'Update user';
  }

  @Delete()
  public removeUser() {
    return 'Remove user';
  }

  @Patch()
  public updatePartialUser() {
    return 'Update partial user';
  }
}
