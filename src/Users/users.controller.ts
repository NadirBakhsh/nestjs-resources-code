import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { GetUsersParamDto } from './dtos/get-user-params.dto';

@Controller('users')
export class UsersController {
  @Get('/:userId?')
  public getUser(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (getUsersParamDto) {
      console.log('type of id', getUsersParamDto instanceof GetUsersParamDto);
      console.log('userId', getUsersParamDto);
      console.log('limit', limit);
      console.log('page', page);
      return `Get user with ID ${getUsersParamDto}`;
    }
    return `Get all users`;
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
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
