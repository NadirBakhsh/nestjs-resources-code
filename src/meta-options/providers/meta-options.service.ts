import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/createPostMetaOptions.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
    constructor(
        /**
         * @inject('MetaOptionRepository')
        */
       @InjectRepository(MetaOption)
       private readonly metaOptionRepository: Repository<MetaOption>
    ) { }
    public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
        let metaOption = this.metaOptionRepository.create(createPostMetaOptionsDto);
     return await this.metaOptionRepository.save(metaOption);
    }
}
