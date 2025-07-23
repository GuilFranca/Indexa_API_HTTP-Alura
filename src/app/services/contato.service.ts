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

  salvarContato(contato: Contato): Observable<Contato> {
    // O método post é utilizado para a inserção de contatos
    return this.http.post<Contato>(this.API, contato)
  }

  buscarPorId(id: number): Observable<Contato> {
    // Concatenação do caminho da API mais o id enviado pelo método
    const url = `${this.API}/${id}`
    return this.http.get<Contato>(url)
  }

  excluirContato(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.delete<Contato>(url)
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`
    // put é o método http para realizar edições no contato
    return this.http.put<Contato>(url, contato);
  }

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContato(contato);
    }
  }

}
