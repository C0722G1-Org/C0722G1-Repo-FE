import {Component, OnInit} from '@angular/core';
import {PostDetail} from '../../entity/post/post-detail';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postDetail: PostDetail = {};

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.postService.findPostById(Number(id)).subscribe(data1 => {
          this.postDetail = data1;
        });
      }
    });
  }

  ngOnInit(): void {
  }
}
