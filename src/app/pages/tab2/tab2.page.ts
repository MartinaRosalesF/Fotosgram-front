import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  tempImages: { path: string, name: string }[] = [];

  cargandoLocation: boolean = false;

  post: any = {
    mensaje: '',
    coords: '',
    posicion: false,
    imgs: []
  }

  constructor(private postService: PostService, private route: Router) { }

  async crearPost() {

    this.tempImages.forEach((img: any) => {
      this.post.imgs.push(img.name)
    });

    await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: '',
      posicion: false,
      imgs: []
    };

    this.tempImages = [];

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

  async sacarFoto() {

    this.procesarImagen(CameraSource.Camera);

  }

  elegirImagen() {

    this.procesarImagen(CameraSource.Photos);

  }

  async procesarImagen(source: CameraSource) {

    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: source,
      correctOrientation: true
    });


    if (image.webPath) {
      const imagenSubida: any = await this.postService.subirImagen(image.webPath);
      if (imagenSubida.ok) {
        this.tempImages.push({ path: image.webPath, name: imagenSubida.name });
      }

    }

  }

}
