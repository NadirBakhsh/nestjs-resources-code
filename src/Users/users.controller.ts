import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  ValidationPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';

@Controller('users')
export class UsersController {
  @Get('/:userId?')
  public getUser(
    @Param('userId', ParseIntPipe) userId: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (userId) {
      console.log('type of id', typeof userId);
      console.log('userId', userId);
      console.log('limit', limit);
      console.log('page', page);
      return `Get user with ID ${userId}`;
    }
    return `Get all users`;
  }

  @Post()
  public createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    const userData = createUserDto;
    console.log(userData);
    console.log('Headers:', headers);
    console.log('ip:', ip);
    return `Create user with data: ${JSON.stringify(userData)}`;
  }

  @Put(':userId')
  public updateUser(@Param('userId') userId: string) {
    return `Update user with ID ${userId}`;
  }

  @Delete(':userId')
  public removeUser(@Param('userId') userId: string) {
    return `Remove user with ID ${userId}`;
  }

  @Patch(':userId')
  public updatePartialUser(@Param('userId') userId: string) {
    return `Update partial user with ID ${userId}`;
  }
}
