import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
import { PatchPostDto } from './dtos/patch-post-dto';
import { PostsService } from './providers/posts.service';
import { GetPostsDto } from './dtos/get-posts-dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    // Injecting Posts Service
    constructor(private readonly postsService: PostsService) {}

    @Get('/:userId?')
    public getPosts(@Param("userId") userId: string, @Query() postQuery: GetPostsDto) {
        console.log("postQuery:", postQuery);
        return this.postsService.findAll(postQuery,userId);
    }

    @ApiOperation({
        summary: 'Create a new post',
    })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @Post()
    public createPost(
        @Req() request,
        /*
        @Body() createPostDto: CreatePostDto
        */
    ) {
        console.log("request.user:", request[REQUEST_USER_KEY]);
        // return this.postsService.create(createPostDto);
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
        return this.postsService.update(patchPostDto);
    }

    @Delete()
    public deletePost(@Query('id', ParseIntPipe) id: number) {
        return this.postsService.delete(id);
    }

}
