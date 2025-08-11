import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query-dto';

export class PaginationProvider {
  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    let results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    return results;
  }
}
