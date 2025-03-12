import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    // Injecting Posts Service
    constructor(private readonly postsService: PostsService) {}

    @Get('/:userId')
    public getPosts(@Param("userId") userId: string) {
        return this.postsService.findAll(userId);
    }

    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
        console.log('createPostDto', createPostDto)
    }

}
