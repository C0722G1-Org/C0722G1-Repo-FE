/* tslint:disable:semicolon */

import {NotificationDtoAllProperty} from './notification-dto-all-property';

/**
 * Create by: DatLA
 * User for screen: Notification-manager
 * Role: Admin
 * Date: 02/02/2023
 */
export interface PageNotificationDto {
  content: NotificationDtoAllProperty[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: true
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: true,
    unpaged: boolean
  },
  totalPages: number,
  last: boolean,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: true,
    sorted: boolean,
    unsorted: true
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}
