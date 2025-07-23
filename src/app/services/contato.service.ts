import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  // Define o caminho da API que iremos utilizar
  // Só copiar o caminho da URL da API
  private readonly API = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {
    
  }

  obterContatos(): Observable<Contato[]> {
    // utilizamos o generic <Contato[]> para informar que o retorno deste metódo deve ser de um array do tipo contato
    // Após isso iremos definir o caminho de onde será pego a Array de contatos
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato) {
    // O método post é utilizado para a inserção de contatos
    return this.http.post<Contato>(this.API, contato)
  }
}
