import {Wards} from './wards';
import {Image} from './image';

export interface PostListHome {
  idPost?: number;
  namePost?: string;
  price?: number;
  area?: number;
  district?: string;
  city?: string;
  imageURL?: string;
  dateCreation?: string;
  nameLandType?: string;
  nameDirection?: string;
  idDemandType?: number;
}
