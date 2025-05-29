import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/createPost.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

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
  ) {}

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    let posts = await this.postRepository
      .find
      //  optional here to include relations get data from other tables
      // {
      // relations: {
      //   metaOptions: true,
      // },
      // }
      ();
    return posts;
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // create a post
    let post = this.postRepository.create(createPostDto);

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
