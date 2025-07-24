import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoService } from '../../services/contato.service';
import { MensagemErroComponent } from '../../componentes/mensagem-erro/mensagem-erro.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    MensagemErroComponent,
    CabecalhoComponent,
    RouterLink
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit{

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    })
  }

  obterControle(nome: string): FormControl {
    const control = this.contatoForm.get(nome);
    if(!control) {
      throw new Error('Controle de formulário não encontrado: ' + control);
    }
    // Utilizamos o as (casting) para converter o tipo para FormControl
    return control as FormControl;
  }

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
        this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        // patchValue pode ser utilizado em conjunto com o formGroup para atualizar a estrutura deste formulário
        this.contatoForm.patchValue(contato);
      });
    }
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    novoContato.id = id ? parseInt(id) : null

    this.contatoService.editarOuSalvarContato(novoContato).subscribe( () =>{
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
  }

  aoSelecionarArquivo(event: any) {
    // file receberá o conteúdo do evento inserido no método, retorna um objeto do tipo FileList que é uma lista de todos os arquivos inseridos pelo usuário
    // event.target se refere ao próprio elemento HTML que disparou o evento
    // Como será retonado um array de imgs precisamos selecionar a primeira, mesmo havendo só uma [0]
    const file: File = event.target.files[0];
    if(file) {
      this.lerArquivo(file)
    }
  }

  lerArquivo(file: File) {
    // Instância fileReader
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.result) {
        // ? navegação segura, se der tudo certo
        this.contatoForm.get('avatar')?.setValue(reader.result)
      }
    }
    // tranforma a img em uma string de base 64
    reader.readAsDataURL(file)
  }

}
