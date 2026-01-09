import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  tempImages: string[] = [];

  cargandoLocation: boolean = false;

  post = {
    mensaje: '',
    coords: '',
    posicion: false
  }

  constructor(private postService: PostService, private route: Router, private geoLocation: Geolocation) { }

  async crearPost() {

    await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: '',
      posicion: false
    };

    this.route.navigateByUrl('main/tab1');

  }

  async getLocation() {

    if (!this.post.posicion) {
      this.post.coords = '';
      this.cargandoLocation = false;
      return;
    }

    try {
      this.cargandoLocation = true;

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        maximumAge: 0
      });

      const coords = `${position.coords.latitude}, ${position.coords.longitude}`
      this.post.coords = coords;
      this.cargandoLocation = false;

    } catch (err) {
      console.error('Error obteniendo ubicación', err);
    }
  }



}
