import {ResponseStatusEnum} from './response-status-enum.enum';
import {CreatePostDto} from './create-post-dto';

export interface BaseResponseCreatePost {
  code: number;
  status: ResponseStatusEnum;
  message: string;
  createPostDto: CreatePostDto;
}
