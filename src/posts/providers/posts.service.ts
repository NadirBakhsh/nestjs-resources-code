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
    private readonly metaOptionRepository: Repository<MetaOption>

  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    // Find A User

    return [
      {
        user: user,
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        user: user,
        title: 'Post 2',
        content: 'Content 2',
      },
    ];
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // create a  meta options
    let metaOption = createPostDto.metaOptions ? this.metaOptionRepository.create(createPostDto.metaOptions) : null;
    if(metaOption) {
      await this.metaOptionRepository.save(metaOption); 
    }

    // create a post
    let post = this.postRepository.create(createPostDto);

    // add meta options to post
    if(metaOption) {
      post.metaOptions = metaOption;
    }
    //  return post
    return await this.postRepository.save(post);
  }

}
