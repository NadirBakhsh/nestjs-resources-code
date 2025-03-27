import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
import { PatchPostDto } from './dtos/patch-post-dto';
import { PostsService } from './providers/posts.service';
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    // Injecting Posts Service
    constructor(private readonly postsService: PostsService) {}

    @Get('/:userId')
    public getPosts(@Param("userId") userId: string) {
        return this.postsService.findAll(userId);
    }

    @ApiOperation({
        summary: 'Create a new post',
    })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @ApiOperation({
        summary: 'Update a post',
    })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto) {
        console.log(patchPostDto)
    }

}
