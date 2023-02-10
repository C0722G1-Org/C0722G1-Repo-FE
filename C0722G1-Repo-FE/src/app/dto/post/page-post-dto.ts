import {Post} from '../../entity/post/post';

export interface PagePostDto {
  content?: Post[];
  pageable?: {
    sort?: {
      empty?: boolean,
      sorted?: boolean,
      unsorted?: boolean
    },
    offset?: number,
    pageSize?: number,
    pageNumber?: number,
    paged?: boolean,
    unpaged?: boolean
  };
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  size?: number;
  number?: number;
  sort?: {
    empty?: boolean,
    sorted?: boolean,
    unsorted?: boolean
  };
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}
