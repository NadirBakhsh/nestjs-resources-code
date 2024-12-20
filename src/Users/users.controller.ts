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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:userId')
  public getUser(@Param('userId') userId: string, @Query() query: any) {
    if (userId) {
      console.log(query);
      return `Get user with ID ${userId}`;
    }
    return `Get all users`;
  }

  @Post()
  public createUser(@Body() req: any) {
    const userData = req;
    console.log(userData);
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
