import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query-dto';
import { Paginated } from '../interfaces/paginated.interface';
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request, // Injecting the request object to access pagination parameters
  ) {}

  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    let results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=1&limit=${paginationQuery.limit}`,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}&limit=${paginationQuery.limit}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${paginationQuery.page}&limit=${paginationQuery.limit}`,
        next: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${paginationQuery.limit}`,
        previous: `${newUrl.origin}${newUrl.pathname}?page=${previousPage}&limit=${paginationQuery.limit}`,
      },
    };

    return finalResponse;
  }
}
