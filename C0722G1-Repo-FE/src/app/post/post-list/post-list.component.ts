import {Component, OnInit} from '@angular/core';
import {Post} from "../../entity/post/post";
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  page: number = 1;
  postList: Post[] | undefined;
  userNameAccount: string = "";

  constructor(private _postService: PostService, private _router: Router) {
    this._postService.findPostListByUserNameAccount(this.userNameAccount).subscribe(data => {
      this.postList = data;
    });
  }

  ngOnInit(): void {
  }

  searchByNameDemandType(value: string) {
    this._postService.findByNameDemandType(value).subscribe(data => {
      this.postList = data;
    })
  }
}
