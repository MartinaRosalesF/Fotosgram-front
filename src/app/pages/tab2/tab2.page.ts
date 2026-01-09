import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  tempImages: string[] = [];

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(private postService: PostService) { }

  crearPost() {

    this.postService.crearPost(this.post);

  }

}
