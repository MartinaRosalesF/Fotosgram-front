import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: false }) slides!: any;

  get swiper() {
    return this.slides.nativeElement.swiper;
  }

  loginUser = {
    email: 'Marti.R@pruebo.com',
    password: '123456'
  }

  registroUser: Usuario = {
    avatar:'av-1.png'
  }

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.swiper.allowTouchMove = false;
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      this.navCtrl.navigateRoot('/main/tab1', { animated: true })
    } else {
      this.uiService.alertaInformativa('Usuario y/o contrasenia no son correctos');
    }

  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }

    const valido = await this.usuarioService.registro(this.registroUser);
    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.alertaInformativa('Ese email ya existe');
    }

  }

  mostrarRegistro() {
    this.swiper.allowTouchMove = true;
    this.swiper.slideTo(1);
    this.swiper.allowTouchMove = false;
  }

  mostrarLogin() {
    this.swiper.allowTouchMove = true;
    this.swiper.slideTo(0);
    this.swiper.allowTouchMove = false;
  }

}
