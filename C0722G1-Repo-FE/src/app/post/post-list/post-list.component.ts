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

  ngOnInit(): void {
  }

}
