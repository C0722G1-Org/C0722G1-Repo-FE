import {Direction} from './direction';
import {StatusPost} from './status-post';
import {Address} from './address';
import {DemandType} from './demand-type';
import {Customer} from '../customer/customer';

export interface PostDetail {
  idPost?: number;
  namePost?: string;
  area?: number;
  note?: string;
  price?: number;
  imageListUrl?: string;
  flagDeleted?: boolean;
  approval?: boolean;
  dateCreation?: Date;
  direction?: Direction;
  statusPost?: StatusPost;
  address?: Address;
  demandType?: DemandType;
  customer?: Customer;
}
