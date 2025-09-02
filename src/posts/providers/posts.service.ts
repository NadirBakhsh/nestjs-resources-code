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
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

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

    // injecting pagination provider
    private readonly paginationProvider: PaginationProvider, // Assuming PaginationProvider is the correct type for pagination provider

    private readonly createPostProvider: CreatePostProvider,
  ) {}

  public async findAll(postQuery: GetPostsDto,userId: string): Promise<Paginated<Post>> {
    let posts = await this.paginationProvider.paginationQuery({
      limit: postQuery.limit,
      page: postQuery.page,
    }, this.postRepository );
    return posts;
  }

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
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
