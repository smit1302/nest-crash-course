import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  //ParseBoolPipe,
  ParseIntPipe,
  Post,
  UseGuards,
  //Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
//import { Request, Response } from 'express';
import { createUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  /*@Get()
  getUsers() {
    return { username: 'Smit', email: 'smitjchoksi28@gmail.com' };
  }*/
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  /*getUsers(@Query('sortDesc', ParseBoolPipe) sortBy: boolean) {
    console.log(sortBy);
    return { username: 'Smit', email: 'smitjchoksi28@gmail.com' };
  }*/
  getUsers() {
    return this.userService;
  }
  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Smit',
        email: 'smitjschoksi28@gmail.com',
        posts: [
          {
            id: 1,
            title: 'Posts1',
          },
          {
            id: 2,
            title: 'Posts2',
          },
        ],
      },
    ];
  }
  @Post('create')
  /*createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('Created');
  }*/
  @UsePipes(ValidationPipe)
  createUser(@Body(ValidateCreateUserPipe) userData: createUserDto) {
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
    //return {};
  }

  /*@Get(':id/:PostId')
  getUserbyId(@Param('id') id: string, @Param('PostId') postId: string) {
    console.log(id);
    return { id, postId };
  }*/
  @Get(':id')
  getUserbyId(@Param('id', ParseIntPipe) id: number) {
    /*  console.log(id);
    return { id };*/
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
