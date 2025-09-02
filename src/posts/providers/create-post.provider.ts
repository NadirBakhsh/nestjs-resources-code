import {
    BadRequestException,
    ConflictException,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/createPost.dto';
import { Post } from '../post.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    // private readonly usersService: UsersService
    private readonly usersService: UsersService,

    // Injecting Meta options repository
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    // injecting Tags service
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    // find author from database based on authorId
    try {
      author = await this.usersService.findOneById(user.sub);
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch {
      throw new ConflictException('User not found');
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('please check tags ids again');
    }

    // create a post
    let post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      //  return post
      return await this.postRepository.save(post);
    } catch {
      throw new ConflictException(error, {
        description: 'ensure post slug is unique',
      });
    }
  }
}
