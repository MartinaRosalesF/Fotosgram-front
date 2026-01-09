import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.siguientes();
  }

  recargar(event: any) {
    this.posts = [];
    this.habilitado = true;
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {

    this.postService.getPosts(pull).subscribe(res => {

      this.posts.push(...res.listadoPosts);

      if (event) {

        event.target.complete();
        if (res.listadoPosts.length === 0) {
          this.habilitado = false;
        }

      }

    });

  }

}
