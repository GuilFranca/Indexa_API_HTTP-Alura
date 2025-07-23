import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { Contato } from '../../componentes/contato/contato';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    RouterLink
  ],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent {

  contato: Contato = {
    id: 0,
    nome: 'dev',
    telefone: '123123123',
    email : 'dev@email.com',
    aniversario: '12/10/1990',
    redes: 'dev.com'
  }

}
