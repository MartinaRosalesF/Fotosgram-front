import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { NavController } from '@ionic/angular';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private navCtrl: NavController) { }


  private ejecutarQuery<T>(query: string) {
    let queryUrl = apiUrl + query;
    return this.http.get<T>(queryUrl);
  }


  getPosts(pull: boolean = false) {
    if (pull) this.paginaPosts = 0;
    this.paginaPosts++;
    return this.ejecutarQuery<RespuestaPosts>(`/posts?pagina=${this.paginaPosts}`);
  }

  crearPost(post: any) {

    return new Promise(resolve => {

      if (!this.usuarioService.token) {
        this.navCtrl.navigateRoot('login');
        resolve(false);
        return;
      }

      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });

      this.http.post(`${apiUrl}/posts`, post, { headers }).subscribe((res: any) => {
        console.log(res);
        if (res['ok']) {

          this.nuevoPost.emit(res['postDB']);
          resolve(true);

        } else {

          resolve(false);

        }
      });

    });

  }

}
