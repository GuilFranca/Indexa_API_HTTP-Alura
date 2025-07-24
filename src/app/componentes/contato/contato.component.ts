import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  @Input() nome: string = ''
  @Input() telefone: string = ''
  // Utilizaremos a interrogração pois o valor de id é opcional
  @Input() id?: number;
  @Input() avatar: string | ArrayBuffer = '';
}
