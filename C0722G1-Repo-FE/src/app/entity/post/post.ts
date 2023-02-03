import {Direction} from "./direction";
import {StatusPost} from "./status-post";
import {Address} from "./address";
import {DemandType} from "./demand-type";
import {LandType} from "./land-type";
import {Customer} from "../customer/customer";

export interface Post {
  idPost?: number;
  namePost?: string;
  area?: number;
  note?: string;
  price?: number;
  imageListURL?: string;
  flagDelete?: boolean;
  approval?: boolean;
  dateCreation?: Date;
  direction?: Direction;
  statusPost?: StatusPost;
  address?: Address;
  demandType?: DemandType;
  landType?: LandType;
  customer?: Customer;
}
