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
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { GetUsersParamDto } from './dtos/get-user-params.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId?')
  @ApiOperation({
    summary:
      'Get users by userId or all, if no userId is provided users will be returned as an array',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of users successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit the number of users',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUser(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {

    return this.usersService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
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
