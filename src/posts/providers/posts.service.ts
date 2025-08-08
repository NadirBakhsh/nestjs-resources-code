import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/createPost.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post-dto';
import { GetPostsDto } from '../dtos/get-posts-dto';

@Injectable()
export class PostsService {
  constructor(
    // private readonly usersService: UsersService
    private readonly usersService: UsersService,

    // Injecting Meta options repository
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    // Injecting Meta options repository
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    // injecting Tags service
    private readonly tagsService: TagsService,
  ) {}

  public async findAll(postQuery: GetPostsDto,userId: string) {
    let posts = await this.postRepository.find({
      skip: (postQuery.page - 1) * postQuery.limit,
      take: postQuery.limit,
     
    });
    return posts;
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // find author from database based on authorId
    let author = await this.usersService.findOneById(createPostDto.authorId);

    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // create a post
    let post = this.postRepository.create({
      ...createPostDto,
      author,
      tags: tags,
    });

    //  return post
    return await this.postRepository.save(post);
  }

  public async delete(id: number) {
    await this.postRepository.delete({ id });
    return {
      deleted: true,
      id,
    };
  }

  public async update(patchPostDto: PatchPostDto) {
    if (!patchPostDto.id) {
      throw new NotFoundException('Post id must be provided');
    }

    let tags;
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (err) {
      throw new NotFoundException('Error fetching tags: ' + err.message);
    }

    let post;
    try {
      post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (err) {
      throw new NotFoundException('Error fetching post: ' + err.message);
    }

    if (!post) {
      throw new NotFoundException(`Post with id ${patchPostDto.id} not found`);
    }

    try {
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.slug = patchPostDto.slug ?? post.slug;
      post.postType = patchPostDto.postType ?? post.postType;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;
      post.tags = tags;

      return await this.postRepository.save(post);
    } catch (err) {
      throw new NotFoundException('Error updating post: ' + err.message);
    }
  }
}
