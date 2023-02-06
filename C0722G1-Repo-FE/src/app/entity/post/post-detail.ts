import {Direction} from './direction';
import {StatusPost} from './status-post';
import {Address} from './address';
import {DemandType} from './demand-type';
import {Customer} from '../customer/customer';
import {LandType} from './land-type';
import {Image} from './image';

export interface PostDetail {
  idPost?: number;
  namePost?: string;
  area?: number;
  note?: string;
  price?: number;
  image?: Image;
  flagDeleted?: boolean;
  approval?: boolean;
  dateCreation?: string;
  direction?: Direction;
  statusPost?: StatusPost;
  address?: Address;
  demandType?: DemandType;
  landType?: LandType;
  customer?: Customer;
}
