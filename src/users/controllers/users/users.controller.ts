import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
//import { Request, Response } from 'express';
import { createUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  /*@Get()
  getUsers() {
    return { username: 'Smit', email: 'smitjchoksi28@gmail.com' };
  }*/
  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return { username: 'Smit', email: 'smitjchoksi28@gmail.com' };
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
  createUser(@Body() userData: createUserDto) {
    console.log(userData);
    return {};
  }

  /*@Get(':id/:PostId')
  getUserbyId(@Param('id') id: string, @Param('PostId') postId: string) {
    console.log(id);
    return { id, postId };
  }*/
  @Get(':id')
  getUserbyId(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return { id };
  }
}
