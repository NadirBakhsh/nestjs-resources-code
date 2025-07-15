import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/createPost.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post-dto';

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

  public async findAll(userId: string) {
    let posts = await this.postRepository.find({
      relations: {
        // author: true,
        metaOptions: true,
        // tags: true,
      },
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
    // find the tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // find the post
    let post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });

    // update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.slug = patchPostDto.slug ?? post.slug;
    post.postType = patchPostDto.postType ?? post.postType;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign the new tags to the post
    post.tags = tags;

    // Save the post and return it
    return await this.postRepository.save(post);
  }
}
