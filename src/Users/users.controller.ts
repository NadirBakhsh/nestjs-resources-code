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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:userId?')
  public getUser(
    @Param('userId', ParseIntPipe) userId: string,
    @Query() query: any,
  ) {
    if (userId) {
      console.log('type of id', typeof userId);
      console.log('userId', userId);
      console.log('limit', typeof query?.limit);
      console.log('offset', typeof query?.offset);
      return `Get user with ID ${userId}`;
    }
    return `Get all users`;
  }

  @Post()
  public createUser(
    @Body() req: any,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    const userData = req;
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
