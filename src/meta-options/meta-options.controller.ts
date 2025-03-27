import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/createPostMetaOptions.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(
        /**
         * @inject('MetaOptionsService')
         */
        private readonly metaOptionsService: MetaOptionsService
    ) {}
    @Post()
    public create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
        return this.metaOptionsService.create(createPostMetaOptionsDto);
    }
}
