import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class PostsService {
    public findAll(userId: string) {
      console.log('userId:', userId);
      // Users Service
      // Find A User
      return [
        {
          title: 'Post 1',
          content: 'Content 1'
        },
        {
          title: 'Post 2',
          content: 'Content 2'
        }
      ];

    }
}

