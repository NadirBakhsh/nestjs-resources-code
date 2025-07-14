import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/createPost.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';

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
}
