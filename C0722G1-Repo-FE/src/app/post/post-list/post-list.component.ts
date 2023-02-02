import {Component, OnInit} from '@angular/core';
import {Post} from "../../entity/post/post";
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  page: number = 1;
  // postList: Post[] | undefined;
postList: Post[]= [
  {
    idPost:1,
    area: 32
  },
  {
    idPost:2,
    area: 32
  },
  {
    idPost:3,
    area: 32
  },
  {
    idPost:4,
    area: 32
  },
  {
    idPost:5,
    area: 32
  },
  {
    idPost:5,
    area: 32
  },
  {
    idPost:5,
    area: 32
  },
  {
    idPost:5,
    area: 32
  },
  {
    idPost:5,
    area: 32
  }
]
  constructor(private _postService: PostService) {
  }

  ngOnInit(): void {
  }

  findPostListByUserNameAccount(userNameAccount: string) {
    this._postService.findPostListByUserNameAccount(userNameAccount).subscribe(data => {
      this.postList = data;
    })
  }
}
