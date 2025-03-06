import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get user By userId',
    example: 123,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;
}
