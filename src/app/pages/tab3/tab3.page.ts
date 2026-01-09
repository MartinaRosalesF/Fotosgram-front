import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uiService: UiService) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.getUsuario();

  }

  async actualizar(fActualizar: NgForm) {

    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if (actualizado) {

      this.uiService.presentToast('top', 'Usuario actualizado correctamente');

    } else {

      this.uiService.presentToast('top', 'Hubo un problema para actualizar');

    }
  }

  logout() {
    this.usuarioService.logout();
  }

}
