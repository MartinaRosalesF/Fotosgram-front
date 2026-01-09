import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


export const usuarioGuardMatch: CanMatchFn = async (route, state) => {

  const usuarioService = inject(UsuarioService);

  return await usuarioService.validaToken();
};

