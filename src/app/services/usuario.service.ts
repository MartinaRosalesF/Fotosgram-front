import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  token: string | null = null;
  usuario: Usuario| null = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) {
    storage.create();
  }

  login(email: string, password: string) {
    const data = { email, password };
    return new Promise(resolve => {
      this.http.post(`${apiUrl}/user/login`, data).subscribe(async (res: any) => {

        if (res.ok) {
          await this.guardarToken(res.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${apiUrl}/user/create`, usuario).subscribe(async (res: any) => {

        if (res.ok) {
          await this.guardarToken(res.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario() {

    if (!this.usuario?._id) {
      this.validaToken();
    }

    return { ...this.usuario };

  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken() {

    await this.cargarToken();

    return new Promise<boolean>(resolve => {

      if (!this.token) {
         this.navCtrl.navigateRoot('login', {animated:true});
        resolve(false);
        return;
      }

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${apiUrl}/user/`, { headers }).subscribe((res: any) => {

        if (res['ok']) {
          this.usuario = res['usuario'];
          resolve(true);
        } else {
           this.navCtrl.navigateRoot('login', {animated:true});
          resolve(false);
        }

      });

    });

  }

  actualizarUsuario(usuario: Usuario) {
    return new Promise(resolve => {

      if (!this.token) {
         this.navCtrl.navigateRoot('login', {animated:true});
        resolve(false);
        return;
      }

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.post(`${apiUrl}/user/update`, usuario, { headers }).subscribe((res: any) => {

        if (res['ok']) {

          this.guardarToken(res['token']);
          resolve(true);

        } else {

          resolve(false);

        }
      });
    });

  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('login', {animated:true});
  }

}
