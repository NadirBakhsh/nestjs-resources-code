import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from './../enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/createPostMetaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({
    description: 'This is the title for the blog post',
    example: 'This is a title',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(512)
  title: string;

  @ApiProperty({
    description: 'Please select the type of post',
    enum: postType,
    example: 'draft',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'Here it is the slug for the blog post',
    example: 'post-url-slug',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, {
    message: 'Slug must be a valid slug',
  })
  slug: string;

  @ApiProperty({
    description: 'Select the status of the post',
    enum: postStatus,
    example: 'published',
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be throw',
    example:
      '{\r\n  "@context": "https:\\/\\/schema.org",\r\n  "@type": "Person"\r\n}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'featured image for your blog post',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Publish date',
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tag IDs passed as number',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description:
            'meta value is a json string',
          example: '{"sidebarEnabled": true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
  
}
