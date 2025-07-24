import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

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
export class PerfilContatoComponent implements OnInit{

  contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email : '',
    aniversario: '',
    redes: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    // snapshot captura instântantea das informações do contato naquele exato momento
    // paramMap para pegar os parâmetros da rota
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // O get do activatedRoute está nos retornando uma string, por conta disso iremos precisar converter o id para que o método buscarPorId receba a mesma como number
    // E ainda nos dará um erro, pois o mesmo pode ser null, nesse caso podemos utilizar um ! (operador de acerção não nula) depois do id, ou então utilzar um if para só fazer isso caso o id exista.
    if(id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contato = contato
      })
    }
  }

  excluir() {
    if (this.contato.id) {
      this.contatoService.excluirContato(this.contato.id).subscribe(() => {});
      this.router.navigateByUrl('/lista-contatos');
    }
  }

}
